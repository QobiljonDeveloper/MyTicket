import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { LoginAdminDto } from 'src/admin/dto/login.admin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController { 
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registiration(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.registiration(createAdminDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginAdminDto, @Res({passthrough:true}) res: Response) {
    return this.authService.login(loginDto, res);
  }
}
