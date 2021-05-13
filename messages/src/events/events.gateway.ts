import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import * as Amqp from 'amqp-ts';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { emit } from 'cluster';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  private users: { [key: string]: { mail: string; queue: Amqp.Queue } } = {};
  private queues: { [key: string]: Amqp.Queue } = {};
  private conn: Amqp.Connection;

  constructor(private authService: AuthService) {
    this.conn = new Amqp.Connection(process.env.RABBITMQ_URL);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `Client disconnected: ${client.id}`,
    );
    delete this.users[client.id];
  }

  async handleConnection(client: Socket, ...args: any[]) {
    if (!client.handshake.query.token) {
      return;
    }
    const user = await this.authService.verify(
      client.handshake.query.token as string,
    );
    this.logger.log(`Client connected: ${user.email} as ${client.id}`);
    let queue: Amqp.Queue;
    if (this.queues[user.email] == null) {
      const exchange = this.conn.declareExchange('TEST', 'fanout');
      queue = this.conn.declareQueue(user.email);
      await queue.bind(exchange);
      await queue.activateConsumer((message) => {
        console.log('Message received: ' + message.getContent());
        this.server.emit('msgToClient', message.getContent());
      });
    } else {
      queue = this.queues[user.email];
    }
    this.users[client.id] = { mail: user.email, queue: queue };
    this.queues[user.email] = queue;
  }
}
