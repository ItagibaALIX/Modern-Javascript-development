import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from '../auth/auth.module';
import { EventsService } from './events.service';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [EventsGateway, EventsService, PrismaService],
})
export class EventsModule {}
