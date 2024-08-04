import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Public } from 'src/decorators/public-route';
import { CreateCategoryDto } from './dto-for-categories/dto-for-create-category';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get(':id')
  category() {}

  @Public()
  @Get('')
  categories() {
    return this.categoriesService.getAllCategories();
  }

  @Public()
  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Put()
  update() {}

  @Delete()
  delete() {}
}
