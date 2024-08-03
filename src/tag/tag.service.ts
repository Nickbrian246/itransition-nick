import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTagDto } from './dto-for-tag/dto-for-tag';
import { errorHandler } from 'src/decorators/error-handler';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const data = await this.prisma.tags.findMany();
    return { data };
  }

  async get(id: string) {
    const data = await this.prisma.tags.findFirstOrThrow({ where: { id } });
    return { data };
  }

  @errorHandler()
  async create(tag: CreateTagDto) {
    await this.prisma.tags.create({ data: tag });
  }

  @errorHandler()
  async delete(id: string) {
    await this.prisma.tags.delete({ where: { id } });
  }
}
