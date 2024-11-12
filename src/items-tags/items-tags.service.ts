import { Injectable } from '@nestjs/common';
import { CreateItemsTagDto } from './dto/create-items-tag.dto';
import { UpdateItemsTagDto } from './dto/update-items-tag.dto';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { ItemTag } from '@prisma/client';

@Injectable()
export class ItemsTagsService {
  constructor(private prismaService: PrismaService) {}

  async create(createItemsTagDto: CreateItemsTagDto) {
    const { itemId, tagsIds } = createItemsTagDto;
    for (let tag of tagsIds) {
      await this.prismaService.itemTag.create({
        data: {
          item: { connect: { id: itemId } },
          tag: { connect: { id: tag } },
        },
      });
    }
  }

  async findAll() {
    return `This action returns all itemsTags`;
  }

  async getItemsByTagId(
    tagId: string,
  ): Promise<ApiSuccessFullResponse<ItemTag[]>> {
    const data = await this.prismaService.itemTag.findMany({
      where: { tagId },
      include: {
        item: {
          include: {
            author: { select: { firstName: true, email: true } },
            editedBy: { select: { firstName: true } },
            collection: { select: { name: true } },
          },
        },
      },
    });
    return { data };
  }

  async findOne(itemId: string): Promise<ApiSuccessFullResponse<ItemTag[]>> {
    const data = await this.prismaService.itemTag.findMany({
      where: { itemId },
      include: { tag: true },
    });
    return { data };
  }

  async update(id: number, updateItemsTagDto: UpdateItemsTagDto) {
    return `This action updates a #${id} itemsTag`;
  }

  async remove(id: number) {
    return `This action removes a #${id} itemsTag`;
  }
}
