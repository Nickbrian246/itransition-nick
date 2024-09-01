import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsTagsService } from './items-tags.service';
import { CreateItemsTagDto } from './dto/create-items-tag.dto';
import { UpdateItemsTagDto } from './dto/update-items-tag.dto';
import { Public } from 'src/decorators/public-route';

@Controller('items-tags')
export class ItemsTagsController {
  constructor(private readonly itemsTagsService: ItemsTagsService) {}

  @Post()
  create(@Body() createItemsTagDto: CreateItemsTagDto) {
    return this.itemsTagsService.create(createItemsTagDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.itemsTagsService.findAll();
  }

  @Public()
  @Get('tag/:id')
  getItemsByTagId(@Param('id') id: string) {
    return this.itemsTagsService.getItemsByTagId(id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') itemId: string) {
    return this.itemsTagsService.findOne(itemId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemsTagDto: UpdateItemsTagDto,
  ) {
    return this.itemsTagsService.update(+id, updateItemsTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsTagsService.remove(+id);
  }
}
