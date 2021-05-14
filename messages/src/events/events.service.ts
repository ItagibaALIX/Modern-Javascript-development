import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { Room } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getUserRooms(userId: string): Promise<Room[]> {
    const userData = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        Rooms: true,
      },
    });
    return userData.Rooms;
  }
}
