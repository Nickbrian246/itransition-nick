import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  ApiSuccessFullResponse,
  likesData,
} from 'src/types/api-successful-response';
import { Likes } from '@prisma/client';
import { UserDecoded } from 'src/types/user';

@Injectable()
export class LikesService {
  constructor(private prismaService: PrismaService) {}

  async getAllLikes(): Promise<ApiSuccessFullResponse<Likes[]>> {
    const data = await this.prismaService.likes.findMany({});
    return { data };
  }

  async getLikesByItemId(
    id: string,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<likesData>> {
    const counter = await this.prismaService.likes.findMany({
      where: { itemId: id },
    });

    const didUserLikeIt = await this.prismaService.likes.findFirst({
      where: {
        itemId: id,
        AND: [{ userId: user.id }],
      },
    });
    return {
      data: { counter: counter.length, didUserLikeIt: !!didUserLikeIt },
    };
  }

  async createLike(
    itemId: string,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<likesData>> {
    await this.prismaService.likes.create({
      data: { itemId: itemId, userId: user.id },
    });
    const counter = await this.prismaService.likes.findMany({
      where: { itemId: itemId },
    });

    const didUserLikeIt = await this.prismaService.likes.findFirst({
      where: {
        itemId: itemId,
        AND: [{ userId: user.id }],
      },
    });
    return {
      data: { counter: counter.length, didUserLikeIt: !!didUserLikeIt },
    };
  }

  async deleteLike(
    itemId: string,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<likesData>> {
    const likeFound = await this.prismaService.likes.findFirstOrThrow({
      where: { itemId: itemId, userId: user.id },
    });
    await this.prismaService.likes.delete({
      where: {
        id: likeFound.id,
        userId: likeFound.userId,
        itemId: likeFound.itemId,
      },
    });
    const counter = await this.prismaService.likes.findMany({
      where: { itemId: itemId },
    });

    const didUserLikeIt = await this.prismaService.likes.findFirst({
      where: {
        itemId: itemId,
        AND: [{ userId: user.id }],
      },
    });
    return {
      data: { counter: counter.length, didUserLikeIt: !!didUserLikeIt },
    };
  }
}
