import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagesController } from './messages/messages.controller';
import { RoomsController } from "./rooms/rooms.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'CORE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'messages_queue',
          queueOptions: {
            durable: false
          },
        }
      }
    ]),
    AuthModule,
    UsersModule,
    RoomsModule,
    MessagesModule,
  ],
  controllers: [AppController, UsersController, MessagesController, RoomsController],
  providers: [],
})
export class AppModule {}
