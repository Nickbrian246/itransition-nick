import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { errorHandler } from 'src/decorators/error-handler';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { CreateCategoryDto } from './dto-for-categories/dto-for-create-category';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getAllCategories(): Promise<ApiSuccessFullResponse<Category[]>> {
    const data = await this.prismaService.category.findMany();
    console.log(data);

    return { data };
  }

  @errorHandler()
  async createCategory(
    category: CreateCategoryDto,
  ): Promise<ApiSuccessFullResponse<Category>> {
    const data = await this.prismaService.category.create({
      data: { name: category.name },
    });
    return { data };
  }
}
