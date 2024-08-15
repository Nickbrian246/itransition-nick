import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public-route';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto-for-tags/dto-for-create-tags';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Public()
  @Get(':id')
  get(@Param() id: string) {
    return this.tagsService.get(id);
  }

  @Public()
  @Get(':id/items')
  getItemsByTagId(@Param('id') id: string) {
    return this.tagsService.getItemsByTagId(id);
  }

  @Public()
  @Get()
  getAll() {
    return this.tagsService.getAll();
  }

  @Public()
  @Post()
  create(@Body() tag: CreateTagDto) {
    return this.tagsService.create(tag);
  }

  @Delete(':id')
  @Public()
  delete(@Param() id: string) {
    return 'hola ';
  }
}
