import { Injectable } from '@nestjs/common';
import { Collection, Prisma } from '@prisma/client';
import { errorHandler } from 'src/decorators/error-handler';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { UserDecoded } from 'src/types/user';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from './dto-for-collections';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}
  @errorHandler()
  async getCollectionById(
    id: string,
  ): Promise<ApiSuccessFullResponse<Collection>> {
    const data = await this.prisma.collection.findFirstOrThrow({
      where: { id: id },
      include: { items: true, category: { select: { name: true, id: true } } },
    });
    return { data };
  }

  @errorHandler()
  async getCollectionItemsById(collectionId: string) {
    return await this.prisma.collection.findFirstOrThrow({
      where: { id: collectionId },
      include: { items: true, user: true },
    });
  }

  @errorHandler()
  async getUserCollections(
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Collection[]>> {
    const data = await this.prisma.collection.findMany({
      where: { userId: user.id },
      include: { items: true },
    });
    return { data };
  }

  @errorHandler()
  async getLatestCollections(): Promise<ApiSuccessFullResponse<Collection[]>> {
    const data = await this.prisma.collection.findMany({
      include: { items: true },
      orderBy: { updatedAt: 'desc' },
    });
    return { data };
  }

  @errorHandler()
  async getCollectionAndCustomFields(id: string) {
    return await this.prisma.collection.findMany({
      where: { id: id },
      include: { customFields: true },
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
  async updateCollectionById(
    collection: UpdateCollectionDto,
    collectionId: string,
  ): Promise<ApiSuccessFullResponse<Collection>> {
    const data = await this.prisma.collection.update({
      where: { id: collectionId },
      data: { ...collection },
    });

    return { data };
  }

  @errorHandler()
  async deleteCollectionById(
    collectionId: string,
  ): Promise<ApiSuccessFullResponse<Collection>> {
    const data = await this.prisma.collection.delete({
      where: { id: collectionId },
    });

    return { data };
  }
}
