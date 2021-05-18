import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from '@prisma/client';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { UsersService } from "../users/users.service";

class InviteToRoomDto {
  email: string;
}

class CreateRoomDto {
  name: string;
}

@UseGuards(AuthenticatedGuard)
@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    ) {
  }

  @Post('/')
  async createRoom(@Request() req, @Body() createRoomData: CreateRoomDto): Promise<Room> {
    return this.roomsService.createRoom(req.user, {
      name: createRoomData.name
    });
  }

  @Post(':id/invite')
  async invite(@Param() params, @Request() req, @Body() inviteToRoomData: InviteToRoomDto): Promise<Room> {
    const user = await this.usersService.user({ email: inviteToRoomData.email });
    console.log('user', user, 'req', req.user);
    return this.roomsService.addToRoom(user, params.id)
  }

  @Get('/')
  async getRooms(@Request() req): Promise<Room[]> {
    return this.roomsService.getUserRooms(req.user.id);
  }
}
