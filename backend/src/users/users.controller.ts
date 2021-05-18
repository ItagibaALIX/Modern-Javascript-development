import { Controller, Request, Get, UseGuards, Query } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { User } from '@prisma/client';
import { UsersService } from "./users.service";

class ListUsersDto {
  email: string;
}

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get('me')
  async post(@Request() req): Promise<User> {
    console.log('/users/me')
    return req.user
  }

  @Get('/')
  async getUsers(@Query() query: ListUsersDto) {
    return this.usersService.users({
      take: 10,
      where: {
        username: {
          startsWith: query.email,
        },
      },
    });
  }
}
