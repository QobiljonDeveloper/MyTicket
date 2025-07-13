import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AdminDocument } from "src/admin/schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { AdminService } from "src/admin/admin.service";
import { LoginAdminDto } from "src/admin/dto/login.admin.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}
  async generateToken(admin: AdminDocument) {
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

    return {
      accessToken,
      refreshToken,
    };
  }

  async registiration(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday email avval ro'yxattan o'tkan");
    }
    const admin = await this.adminService.create(createAdminDto);
    return { adminId: admin._id };
  }
  async login(loginDto: LoginAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Bunday email mavjud emas");
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      admin.password
    );
    if (!isValidPassword) {
      throw new UnauthorizedException("Parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateToken(admin);

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { adminId: admin._id, accessToken };
  }
}
