import { Module } from '@nestjs/common';
import { CommentsWebSocketService } from './comments-web-socket.service';
import { CommentsWebSocketGateway } from './comments-web-socket.gateway';

@Module({
  providers: [CommentsWebSocketGateway, CommentsWebSocketService],
})
export class CommentsWebSocketModule {}
