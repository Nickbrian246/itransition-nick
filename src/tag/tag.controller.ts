import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto-for-tag/dto-for-tag';
import { Public } from 'src/decorators/public-route';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Public()
  @Get(':id')
  get(@Param() id: string) {
    return this.tagService.get(id);
  }

  @Public()
  @Get()
  getAll() {
    return this.tagService.getAll();
  }

  @Public()
  @Post()
  create(@Body() tag: CreateTagDto) {
    return this.tagService.create(tag);
  }

  @Delete(':id')
  @Public()
  delete(@Param() id: string) {
    return 'hola ';
  }
}
