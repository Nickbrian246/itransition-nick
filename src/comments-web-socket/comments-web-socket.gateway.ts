import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CommentsWebSocketService } from './comments-web-socket.service';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommentsWebSocketGateway {
  constructor(
    private readonly commentsWebSocketService: CommentsWebSocketService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('commentsRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: { itemId: string },
  ): void {
    const { itemId } = room;

    client.join(itemId);
  }

  updateComments(itemId: string): boolean {
    return this.server.to(itemId).emit('newComment');
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
