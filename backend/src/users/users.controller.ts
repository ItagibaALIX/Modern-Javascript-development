import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { User } from '@prisma/client';

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  async post(@Request() req): Promise<User> {
    return req.user
  }
}
