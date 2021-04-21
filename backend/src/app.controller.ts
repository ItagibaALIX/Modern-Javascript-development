import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginGuard } from './auth/login.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('auth/login')
  async login(@Request() req) {
  }

  @Post('auth/register')
  async register(@Request() req) {
    console.log(req.body)
    return this.authService.register(req.body);
  }
}
