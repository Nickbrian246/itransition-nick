import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Comments } from '@prisma/client';
import { CreateCommentDto, UpdateCommentDto } from './dto-for-comments';
import { UserDecoded } from 'src/types/user';
import { CommentsWebSocketGateway } from 'src/comments-web-socket/comments-web-socket.gateway';

@Injectable()
export class CommentsService {
  constructor(
    private prismaService: PrismaService,
    private commentsGateway: CommentsWebSocketGateway,
  ) {}

  async getCommentById(id: string): Promise<ApiSuccessFullResponse<Comments>> {
    const data = await this.prismaService.comments.findFirstOrThrow({
      where: { id },
    });

    return { data };
  }

  async getCommentsByItemId(
    id: string,
  ): Promise<ApiSuccessFullResponse<Comments[]>> {
    const data = await this.prismaService.comments.findMany({
      where: { itemId: id },
      include: { user: { select: { firstName: true } } },
      orderBy: { updatedAt: 'desc' },
    });

    return { data };
  }

  async createComment(
    comment: CreateCommentDto,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Comments>> {
    const data = await this.prismaService.comments.create({
      data: {
        content: comment.content,
        itemId: comment.itemId,
        userId: user.id,
      },
    });

    this.commentsGateway.updateComments(comment.itemId);
    return { data };
  }

  async updateCommentById(
    id: string,
    comments: UpdateCommentDto,
  ): Promise<ApiSuccessFullResponse<Comments>> {
    const data = await this.prismaService.comments.update({
      where: { id },
      data: { content: comments.content },
    });
    return { data };
  }

  async deleteCommentById(
    id: string,
  ): Promise<ApiSuccessFullResponse<Comments>> {
    const data = await this.prismaService.comments.delete({
      where: { id },
    });
    return { data };
  }
}
