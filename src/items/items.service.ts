import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto } from './dto-for-items';
import { errorHandler } from 'src/decorators/error-handler';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Item } from '@prisma/client';
import { UpdateItemDto } from './dto-for-items/dto-for-update-item';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getItemById(id: string): Promise<ApiSuccessFullResponse<Item>> {
    const item = await this.prismaService.item.findFirstOrThrow({
      where: { id },
    });
    const data =
      item.customFields && typeof item.customFields === 'string'
        ? { ...item, customFields: JSON.parse(item.customFields) }
        : item;
    return { data };
  }

  @errorHandler()
  async createItem(item: CreateItemDto): Promise<ApiSuccessFullResponse<Item>> {
    const data = await this.prismaService.item.create({
      data: {
        name: item.name,
        collectionId: item.collectionId,
        tagId: item.tagId,
      },
    });
    return { data };
  }

  @errorHandler()
  async updateItemById(
    id: string,
    item: UpdateItemDto,
  ): Promise<ApiSuccessFullResponse<Item>> {
    const itemData = {
      ...item,
      customFields: item.customFields
        ? JSON.stringify(item.customFields)
        : null,
    };
    const data = await this.prismaService.item.update({
      where: { id },
      data: { ...itemData },
    });
    return { data };
  }

  @errorHandler()
  async deleteItemById(id: string): Promise<ApiSuccessFullResponse<Item>> {
    const data = await this.prismaService.item.delete({
      where: { id },
    });
    return { data };
  }
}
