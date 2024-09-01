import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto } from './dto-for-items';
import { errorHandler } from 'src/decorators/error-handler';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto-for-items/dto-for-update-item';
import { UserDecoded } from 'src/types/user';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getAllItems(): Promise<ApiSuccessFullResponse<Item[]>> {
    const data = await this.prismaService.item.findMany();

    return { data };
  }

  @errorHandler()
  async getItemById(id: string): Promise<ApiSuccessFullResponse<Item>> {
    const item = await this.prismaService.item.findFirstOrThrow({
      where: { id },
      include: {
        tags: { include: { tag: { select: { name: true, id: true } } } },
        author: { select: { firstName: true, email: true } },
        editedBy: { select: { firstName: true } },
      },
    });
    const data =
      item.customFields && typeof item.customFields === 'string'
        ? { ...item, customFields: JSON.parse(item.customFields) }
        : item;
    return { data };
  }

  @errorHandler()
  async getLatestItems(): Promise<ApiSuccessFullResponse<Item[]>> {
    const item = await this.prismaService.item.findMany({
      include: {
        collection: { select: { name: true } },
        author: { select: { firstName: true } },
        editedBy: { select: { firstName: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    // const data =
    //   item.customFields && typeof item.customFields === 'string'
    //     ? { ...item, customFields: JSON.parse(item.customFields) }
    //     : item;
    return { data: item };
  }

  @errorHandler()
  async getAllCollectionItems(
    id: string,
  ): Promise<ApiSuccessFullResponse<Item[]>> {
    const item = await this.prismaService.item.findMany({
      where: { collectionId: id },
      include: {
        collection: { select: { name: true } },
        author: { select: { firstName: true } },
        editedBy: { select: { firstName: true } },
        tags: { select: { id: true, tag: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'asc' },
    });
    // const data =
    //   item.customFields && typeof item.customFields === 'string'
    //     ? { ...item, customFields: JSON.parse(item.customFields) }
    //     : item;
    return { data: item };
  }

  //TODO solution for many to many problems
  @errorHandler()
  async createItem(
    item: CreateItemDto,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Item>> {
    const data = await this.prismaService.item.create({
      data: {
        name: item.name,
        collectionId: item.collectionId,
        userId: item.userId,
        editedById: user.id,
        authorId: user.id,
        customFields: JSON.stringify(item.customFields) ?? null,
      },
    });
    return { data };
  }

  @errorHandler()
  async updateItemById(
    id: string,
    item: UpdateItemDto,
    user: UserDecoded,
  ): Promise<ApiSuccessFullResponse<Item>> {
    const data = await this.prismaService.item.update({
      where: { id },
      data: {
        name: item.name,
        isEdited: true,
        editedById: user.id,
        customFields: JSON.stringify(item.customFields) ?? null,
      },
    });
    return { data };
  }

  @errorHandler()
  async deleteItemById(id: string) {
    await this.prismaService.likes.deleteMany({
      where: { itemId: id },
    });
    await this.prismaService.comments.deleteMany({
      where: { itemId: id },
    });

    await this.prismaService.item.delete({
      where: { id },
    });
  }
}
