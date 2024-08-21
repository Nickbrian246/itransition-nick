import { Injectable } from '@nestjs/common';
import { errorHandler } from 'src/decorators/error-handler';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Comments } from '@prisma/client';
import { CreateCommentDto, UpdateCommentDto } from './dto-for-comments';
import { UserDecoded } from 'src/types/user';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getCommentById(id: string): Promise<ApiSuccessFullResponse<Comments>> {
    const data = await this.prismaService.comments.findFirstOrThrow({
      where: { id },
    });

    return { data };
  }
  @errorHandler()
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

  @errorHandler()
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
    return { data };
  }

  @errorHandler()
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

  @errorHandler()
  async deleteCommentById(
    id: string,
  ): Promise<ApiSuccessFullResponse<Comments>> {
    const data = await this.prismaService.comments.delete({
      where: { id },
    });
    return { data };
  }
}
