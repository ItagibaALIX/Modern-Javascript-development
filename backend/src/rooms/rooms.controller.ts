import { Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from '@prisma/client';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {
  }

  @Post(':name')
  async createRoom(@Param() params, @Request() req): Promise<Room> {
    return this.roomsService.createRoom(req.user, {
      name: params.name
    });
  }

  @Get('/')
  async getRooms(@Request() req): Promise<Room> {
    return { id: 'default', name: 'Default' }
  }
}
