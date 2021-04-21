import { Module } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
    {
      name: 'MESSAGES_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'messages_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),
  ],
  providers: [],
  exports: [],
})
export class MessagesModule {}
