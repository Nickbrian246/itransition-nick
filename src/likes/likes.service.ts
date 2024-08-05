import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LikeDto } from './dto-for-likes';
import { errorHandler } from 'src/decorators/error-handler';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Likes } from '@prisma/client';

@Injectable()
export class LikesService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getAllLikes(): Promise<ApiSuccessFullResponse<Likes[]>> {
    const data = await this.prismaService.likes.findMany({});
    return { data };
  }

  @errorHandler()
  async getLikeByUserIdAndItemId(
    like: LikeDto,
  ): Promise<ApiSuccessFullResponse<Likes>> {
    const data = await this.prismaService.likes.findFirstOrThrow({
      where: {
        userId: like.userId,
        itemId: like.itemId,
      },
    });
    return { data };
  }

  @errorHandler()
  async createLike(like: LikeDto) {
    await this.prismaService.likes.create({
      data: { itemId: like.itemId, userId: like.userId },
    });
  }

  @errorHandler()
  async deleteLike(like: LikeDto) {
    const likeFound = await this.prismaService.likes.findFirstOrThrow({
      where: { itemId: like.itemId, userId: like.userId },
    });

    await this.prismaService.likes.delete({
      where: {
        id: likeFound.id,
        userId: likeFound.userId,
        itemId: likeFound.itemId,
      },
    });
  }
}
