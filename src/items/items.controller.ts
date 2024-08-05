import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto-for-items';
import { UpdateItemDto } from './dto-for-items/dto-for-update-item';
import { Public } from 'src/decorators/public-route';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Public()
  @Get(':id')
  getItemById(@Param('id') id: string) {
    return this.itemsService.getItemById(id);
  }

  @Public()
  @Get()
  getAllItems() {
    return this.itemsService.getAllItems();
  }

  @Post()
  createItem(@Body() item: CreateItemDto) {
    return this.itemsService.createItem(item);
  }

  @Put(':id')
  updateItemById(@Param('id') id: string, @Body() item: UpdateItemDto) {
    return this.itemsService.updateItemById(id, item);
  }

  @Delete(':id')
  deleteItemById(@Param('id') id: string) {
    return this.itemsService.deleteItemById(id);
  }
}
