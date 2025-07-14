import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import * as bcrypt from "bcrypt";

import { AdminDocument } from "src/admin/schemas/admin.schema";
import { AdminService } from "src/admin/admin.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { LoginAdminDto } from "src/admin/dto/login.admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  private async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async registration(createAdminDto: CreateAdminDto) {
    const existing = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (existing) {
      throw new ConflictException("Bunday email ro'yxatdan o'tgan");
    }

    const admin = await this.adminService.create(createAdminDto);
    return { adminId: admin._id };
  }

  async login(loginDto: LoginAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email topilmadi");
    }

    const isMatch = await bcrypt.compare(loginDto.password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException("Parol noto‘g‘ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return { adminId: admin._id, accessToken };
  }

  async refreshToken(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException("Token yaroqsiz");
    }

    const admin = await this.adminService.findOne(payload.id);
    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki refresh token mavjud emas"
      );
    }

    const isMatch = await bcrypt.compare(token, admin.hashed_refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException("Refresh token noto‘g‘ri");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(admin);

    admin.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", newRefreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return { accessToken };
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new UnauthorizedException("Token topilmadi");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException("Token yaroqsiz");
    }

    const admin = await this.adminService.findOne(payload.id);
    if (!admin) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    admin.hashed_refresh_token = "";
    await admin.save();

    res.clearCookie("refreshToken");

    return { message: "Muvaffaqiyatli chiqildi" };
  }
}
