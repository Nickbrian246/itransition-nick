import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma.service';
import { CommentsWebSocketGateway } from 'src/comments-web-socket/comments-web-socket.gateway';
import { CommentsWebSocketService } from 'src/comments-web-socket/comments-web-socket.service';
import { CommentsWebSocketModule } from 'src/comments-web-socket/comments-web-socket.module';
@Module({
  imports: [CommentsWebSocketModule],
  providers: [
    CommentsService,
    PrismaService,
    CommentsWebSocketGateway,
    CommentsWebSocketService,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
