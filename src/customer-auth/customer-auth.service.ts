import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import * as bcrypt from "bcrypt";

import { CustomerService } from "../customer/customer.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { LoginCustomerDto } from "../customer/dto/login.customer.dto";
import { CustomerDocument } from "../customer/schemas/customer.schema";

@Injectable()
export class CustomerAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService
  ) {}

  private async generateTokens(customer: CustomerDocument) {
    const payload = {
      id: customer._id,
      email: customer.email,
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

  async registration(createDto: CreateCustomerDto) {
    const existing = await this.customerService.findByEmail(createDto.email);
    if (existing) throw new ConflictException("Email band");

    const customer = await this.customerService.create(createDto);
    return { customerId: customer._id };
  }

  async login(loginDto: LoginCustomerDto, res: Response) {
    const customer = await this.customerService.findByEmail(loginDto.email);
    if (!customer) throw new UnauthorizedException("Email noto‘g‘ri");

    const isMatch = await bcrypt.compare(
      loginDto.password,
      customer.hashed_password
    );
    if (!isMatch) throw new UnauthorizedException("Parol noto‘g‘ri");

    const { accessToken, refreshToken } = await this.generateTokens(customer);

    customer.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await customer.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return { customerId: customer._id, accessToken };
  }

  async refreshToken(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) throw new UnauthorizedException("Token topilmadi");

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException("Token yaroqsiz");
    }

    const customer = await this.customerService.findById(payload.id);
    if (!customer || !customer.hashed_refresh_token)
      throw new UnauthorizedException("Mijoz topilmadi");

    const isMatch = await bcrypt.compare(token, customer.hashed_refresh_token);
    if (!isMatch) throw new UnauthorizedException("Token noto‘g‘ri");

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(customer);

    customer.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await customer.save();

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
    if (!token) throw new UnauthorizedException("Token topilmadi");

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch {
      throw new UnauthorizedException("Token yaroqsiz");
    }

    const customer = await this.customerService.findById(payload.id);
    if (!customer) throw new NotFoundException("Mijoz topilmadi");

    customer.hashed_refresh_token = "";
    await customer.save();

    res.clearCookie("refreshToken");

    return { message: "Chiqildi" };
  }
}
