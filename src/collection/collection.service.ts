import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from './dto-for-collection.ts/dto-for-collection';
import { errorHandler } from 'src/decorators/error-handler';
import { UserDecoded } from 'src/types/user';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Collection } from '@prisma/client';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}
  @errorHandler()
  async getMyCollection(id: string, user: UserDecoded) {
    return await this.prisma.collection.findFirstOrThrow({
      where: { id: id },
    });
  }

  @errorHandler()
  async getMyCollections(user: UserDecoded) {
    return await this.prisma.collection.findMany({
      where: { userId: user.id },
    });
  }

  @errorHandler()
  async createMy(
    collection: CreateCollectionDto,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Collection>> {
    const data = await this.prisma.collection.create({
      data: {
        user: { connect: { id: user.id } },
        ...collection,
        category: { connect: { id: collection.category } },
      },
    });
    return { data };
  }

  @errorHandler()
  async updateMy(
    collection: UpdateCollectionDto,
    collectionId: string,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Collection>> {
    const data = await this.prisma.collection.update({
      where: { id: collectionId, userId: user.id },
      data: { ...collection },
    });

    return { data };
  }

  @errorHandler()
  async deleteMyCollection(
    collectionId: string,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Collection>> {
    const data = await this.prisma.collection.delete({
      where: { id: collectionId, userId: user.id },
    });

    return { data };
  }
}
