import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';
import { CollectionService } from './collection.service';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from './dto-for-collection.ts/dto-for-collection';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get(':id')
  GetCollection(@Param('id') id: string, @GetUser() user: UserDecoded) {
    return this.collectionService.getMyCollection(id, user);
  }

  @Get('/collection/item')
  GetCollections(@GetUser() user: UserDecoded) {
    return this.collectionService.getMyCollections(user);
  }

  @Post()
  createCollection(
    @Body() collection: CreateCollectionDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.collectionService.createMy(collection, user);
  }

  @Put(':id')
  updateCollection(
    @Param('id') id: string,
    @Body() collection: UpdateCollectionDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.collectionService.updateMy(collection, id, user);
  }

  @Delete(':id')
  deleteCollection(@Param('id') id: string, @GetUser() user: UserDecoded) {
    return this.collectionService.deleteMyCollection(id, user);
  }
}
