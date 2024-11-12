import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTagDto } from './dto-for-tags/dto-for-create-tags';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Tags } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<ApiSuccessFullResponse<Tags[]>> {
    const data = await this.prisma.tags.findMany();
    return { data };
  }

  async get(id: string): Promise<ApiSuccessFullResponse<Tags>> {
    const data = await this.prisma.tags.findFirstOrThrow({ where: { id } });
    return { data };
  }

  async getItemsByTagId(id: string): Promise<ApiSuccessFullResponse<Tags>> {
    const data = await this.prisma.tags.findFirstOrThrow({
      where: { id },
      include: {
        items: {
          include: {
            item: {
              select: {
                author: {
                  select: { firstName: true },
                },
                collection: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    return { data };
  }

  async create(tag: CreateTagDto): Promise<ApiSuccessFullResponse<Tags>> {
    const data = await this.prisma.tags.create({ data: tag });
    return { data };
  }

  async delete(id: string) {
    await this.prisma.tags.delete({ where: { id } });
  }
}
