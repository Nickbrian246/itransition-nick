import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LikeDto } from './dto-for-likes';
import { errorHandler } from 'src/decorators/error-handler';
import {
  ApiSuccessFullResponse,
  likesData,
} from 'src/types/api-successful-response';
import { Likes } from '@prisma/client';
import { UserDecoded } from 'src/types/user';

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
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Likes>> {
    const data = await this.prismaService.likes.findFirstOrThrow({
      where: {
        userId: user.id,
        itemId: like.itemId,
      },
    });
    return { data };
  }

  @errorHandler()
  async createLike(
    like: LikeDto,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<likesData>> {
    await this.prismaService.likes.create({
      data: { itemId: like.itemId, userId: user.id },
    });
    const counter = await this.prismaService.likes.findMany({
      where: { itemId: like.itemId },
    });

    const didUserLikeIt = await this.prismaService.likes.findFirst({
      where: {
        itemId: like.itemId,
        AND: [{ userId: user.id }],
      },
    });
    return {
      data: { counter: counter.length, didUserLikeIt: !!didUserLikeIt },
    };
  }

  @errorHandler()
  async deleteLike(like: LikeDto, user: UserDecoded) {
    const likeFound = await this.prismaService.likes.findFirstOrThrow({
      where: { itemId: like.itemId, userId: user.id },
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
