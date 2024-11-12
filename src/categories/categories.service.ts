import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { errorHandler } from 'src/decorators/error-handler';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { CreateCategoryDto } from './dto-for-categories/dto-for-create-category';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async getAllCategories(): Promise<ApiSuccessFullResponse<Category[]>> {
    const data = await this.prismaService.category.findMany();

    return { data };
  }

  async createCategory(
    category: CreateCategoryDto,
  ): Promise<ApiSuccessFullResponse<Category>> {
    const data = await this.prismaService.category.create({
      data: { name: category.name },
    });
    return { data };
  }
}
