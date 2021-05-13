import { Controller, Request, Post, UseGuards, Inject } from '@nestjs/common';
import * as Amqp from 'amqp-ts';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('messages')
export class MessagesController {
  private conn: Amqp.Connection;

  constructor() {
    this.conn = new Amqp.Connection(process.env.RABBITMQ_URL);
  }

  @Post('send')
  async post(@Request() req): Promise<void> {
    console.log('SEND MESSAGE', req.user);
    const exchange = this.conn.declareExchange("TEST", "fanout");
    exchange.send(new Amqp.Message(JSON.stringify({ sender: req.user.username, message: req.body.message })))
  }
}
