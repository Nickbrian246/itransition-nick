import { Injectable } from '@nestjs/common';
import { errorHandler } from 'src/decorators/error-handler';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto-for-category/dto-for-category';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { Category } from '@prisma/client';
@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getAll(): Promise<ApiSuccessFullResponse<Category[]>> {
    const data = await this.prismaService.category.findMany();
    console.log(data);

    return { data };
  }

  @errorHandler()
  async create(
    category: CreateCategoryDto,
  ): Promise<ApiSuccessFullResponse<Category>> {
    const data = await this.prismaService.category.create({
      data: { name: category.name },
    });
    return { data };
  }
}
