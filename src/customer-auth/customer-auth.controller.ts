import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomerAuthService } from "./customer-auth.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { LoginCustomerDto } from "../customer/dto/login.customer.dto";

@Controller("customer-auth")
export class CustomerAuthController {
  constructor(private readonly authService: CustomerAuthService) {}

  @Post("register")
  register(@Body() dto: CreateCustomerDto) {
    return this.authService.registration(dto);
  }

  @Post("login")
  login(
    @Body() dto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(dto, res);
  }

  @Post("refresh")
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Post("logout")
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
}
