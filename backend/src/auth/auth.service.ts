import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ email });
    
    if (user && await compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async register(user: any): Promise<User> {
    return this.usersService.createUser({
      username: user.username,
      password: user.password,
      email: user.email,
    });
  }
}
