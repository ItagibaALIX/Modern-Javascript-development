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
        members: [user],
        ...data,
      }
    });
  }

  async addToRoom(user: User, id: string): Promise<Room> {
    return this.prisma.room.update({
        where: { id },
        data: {
          members: {
            connect: [
              { id: user.id }
            ]
          }
        }
      }
    )
  }

  async getUserRooms(userId: string): Promise<Room[]> {
    const userData = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        Rooms: true,
      }
    })
    return userData.Rooms;
  }
}
