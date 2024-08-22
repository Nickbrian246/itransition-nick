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
      include: {
        items: true,
        category: { select: { name: true, id: true } },
        user: { select: { email: true } },
      },
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
    userId: string,
  ): Promise<ApiSuccessFullResponse<Collection[]>> {
    const data = await this.prisma.collection.findMany({
      where: { userId: userId },
      include: { items: true },
    });
    return { data };
  }

  @errorHandler()
  async getLatestCollections(): Promise<ApiSuccessFullResponse<Collection[]>> {
    const data = await this.prisma.collection.findMany({
      include: { items: true },
      orderBy: { updatedAt: 'desc' },
      take: 5,
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
        user: { connect: { id: collection.userId } },
        editedBy: { connect: { id: user.id } },
        author: { connect: { id: user.id } },
        name: collection.name,
        description: collection.description,
        imageId: collection.imageId ?? null,
        category: { connect: { id: collection.category } },
      },
    });
    return { data };
  }

  @errorHandler()
  async updateCollectionById(
    collection: UpdateCollectionDto,
    collectionId: string,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Collection>> {
    const data = await this.prisma.collection.update({
      where: { id: collectionId },
      data: {
        name: collection.name,
        editedById: user.id,
        isEdited: true,
        categoryId: collection.category,
        description: collection.description,
        imageId: collection.imageId ?? null,
      },
    });

    return { data };
  }

  @errorHandler()
  async deleteCollectionById(collectionId: string) {
    const itemsIds = await this.prisma.item.findMany({
      where: { collectionId },
    });
    if (itemsIds.length > 0) {
      for (let item of itemsIds) {
        await this.prisma.likes.deleteMany({ where: { itemId: item.id } });
      }
      for (let item of itemsIds) {
        await this.prisma.comments.deleteMany({ where: { itemId: item.id } });
      }

      await this.prisma.item.deleteMany({ where: { collectionId } });
    }

    await this.prisma.collection.delete({
      where: { id: collectionId },
    });
  }
}
