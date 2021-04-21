import { Injectable } from '@nestjs/common';
import { PrismaService } from "../db/prisma.service";
import {
  Room,
  User,
  Prisma
} from '@prisma/client';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {
  }

  async createRoom(user: User, data: Prisma.RoomCreateInput): Promise<Room> {
    return this.prisma.room.create({
      data: {
        //members: [user],
        ...data,
      }
    });
  }
}
