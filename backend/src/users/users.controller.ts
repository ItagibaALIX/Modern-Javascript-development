import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get('me')
  async me(@Request() req): Promise<UserModel> {
    return req.user;
  }
}
