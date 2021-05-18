import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
