import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
