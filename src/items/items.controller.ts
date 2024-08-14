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
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Public()
  @Get('latest/feed')
  getLatestItems() {
    return this.itemsService.getLatestItems();
  }
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
  createItem(@Body() item: CreateItemDto, @GetUser() user: UserDecoded) {
    return this.itemsService.createItem(item, user);
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
