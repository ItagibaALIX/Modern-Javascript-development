import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import * as Amqp from 'amqp-ts';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { RoomsService } from "../rooms/rooms.service";

class SendMessageDto {
  room: string;
  message: string;
}

@UseGuards(AuthenticatedGuard)
@Controller('messages')
export class MessagesController {
  private conn: Amqp.Connection;

  constructor(
    private roomsService: RoomsService,
  ) {
    this.conn = new Amqp.Connection(process.env.RABBITMQ_URL);
  }

  @Post('send')
  async post(@Request() req, @Body() sendMessageData: SendMessageDto): Promise<void> {
    const userRooms = await this.roomsService.getUserRooms(req.user.id);
    if (!userRooms.find((r) => r.id === sendMessageData.room)) {
      throw Error('User does not belong in room');
    }
    console.log(`Sending message from ${req.user.id} to ${sendMessageData.room}`);
    const exchange = this.conn.declareExchange(sendMessageData.room, "fanout");
    exchange.send(new Amqp.Message(JSON.stringify({ sender: req.user.username, message: req.body.message, room: sendMessageData.room })))
  }
}
