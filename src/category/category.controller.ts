import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'src/decorators/public-route';
import { CreateCategoryDto } from './dto-for-category/dto-for-category';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Public()
  @Get(':id')
  category() {}

  @Public()
  @Get('')
  categories() {
    return this.categoryService.getAll();
  }

  @Public()
  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Put()
  update() {}

  @Delete()
  delete() {}
}
