import { Module } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { RoomsModule } from "../rooms/rooms.module";

@Module({
  imports: [
    RoomsModule,
  ],
  providers: [PrismaService],
  exports: [],
})
export class MessagesModule {
}
