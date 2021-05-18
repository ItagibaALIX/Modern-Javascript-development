import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import * as Amqp from 'amqp-ts';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { EventsService } from './events.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  private users: { [key: string]: string } = {};
  private queues: { [key: string]: Amqp.Queue[] } = {};
  private conn: Amqp.Connection;

  constructor(
    private authService: AuthService,
    private eventService: EventsService,
  ) {
    this.conn = new Amqp.Connection(process.env.RABBITMQ_URL);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const userId = this.users[client.id];
    delete this.users[client.id];
    try {
      if (!Object.values(this.users).find((uid) => userId === uid)) {
        const queues = this.queues[userId];
        await Promise.all(queues.map((q) => q.delete()));
        delete this.queues[userId];
      }
    } catch {}
  }

  async connectToUserRooms(userId: string) {
    const rooms = await this.eventService.getUserRooms(userId);
    this.logger.log(`Rooms ${JSON.stringify(rooms)} `);
    const queue = this.conn.declareQueue(userId);

    this.queues[userId] = await Promise.all(
      rooms.map(async (room) => {
        const exchange = this.conn.declareExchange(room.id, 'fanout');
        await queue.bind(exchange);
      
        this.logger.log(`connected user id ${userId} to room ${room.id} `);
        return queue;
      }),
    );
    await queue.activateConsumer((message) => {
      console.log('Message received: ' + message.getContent());
      this.server.emit(
        userId,
        JSON.stringify({
          ...JSON.parse(message.getContent()),
        }),
      );
    });
  }

  async handleConnection(client: Socket) {
    if (!client.handshake.query.token) {
      return;
    }
    const user = await this.authService.verify(
      client.handshake.query.token as string,
    );
    this.logger.log(`Client connected: ${user.email} user id: ${user.id}  as ${client.id}`);
    if (this.queues[user.id] == null) {
      try {
        await this.connectToUserRooms(user.id);

      } catch (e) {
        this.logger.log(`handleConnection ERROR: ${e}`);
      }
    }
    this.users[client.id] = user.id;
  }

}
