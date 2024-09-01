import { Injectable } from '@nestjs/common';
import { errorHandler } from 'src/decorators/error-handler';
import { PrismaService } from 'src/prisma.service';
import { CreateTagDto } from './dto-for-tags/dto-for-create-tags';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Tags } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  @errorHandler()
  async getAll(): Promise<ApiSuccessFullResponse<Tags[]>> {
    const data = await this.prisma.tags.findMany();
    return { data };
  }

  @errorHandler()
  async get(id: string): Promise<ApiSuccessFullResponse<Tags>> {
    const data = await this.prisma.tags.findFirstOrThrow({ where: { id } });
    return { data };
  }

  @errorHandler()
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

  @errorHandler()
  async create(tag: CreateTagDto): Promise<ApiSuccessFullResponse<Tags>> {
    const data = await this.prisma.tags.create({ data: tag });
    return { data };
  }

  @errorHandler()
  async delete(id: string) {
    await this.prisma.tags.delete({ where: { id } });
  }
}
