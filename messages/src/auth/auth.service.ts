import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email });

    if (user && (await compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async verify(token: string): Promise<User | null> {
    const payload = <any>verify(token, 'secret');
    const user = await this.usersService.user({ id: payload.sub });

    if (!user) {
      throw new WsException('Unauthorized access');
    }
    return user;
  }
}
