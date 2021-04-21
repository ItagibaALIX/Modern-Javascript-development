import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors({origin: "https://hoppscotch.io"});
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'messages_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
