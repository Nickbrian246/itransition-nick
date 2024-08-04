import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from './dto-for-collections';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}
  @Get(':id')
  GetCollection(@Param('id') id: string, @GetUser() user: UserDecoded) {
    return this.collectionsService.getMyCollection(id, user);
  }

  @Get('/collection/item')
  GetCollections(@GetUser() user: UserDecoded) {
    return this.collectionsService.getMyCollections(user);
  }

  @Post()
  createCollection(
    @Body() collection: CreateCollectionDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.collectionsService.createMy(collection, user);
  }

  @Put(':id')
  updateCollection(
    @Param('id') id: string,
    @Body() collection: UpdateCollectionDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.collectionsService.updateMy(collection, id, user);
  }

  @Delete(':id')
  deleteCollection(@Param('id') id: string, @GetUser() user: UserDecoded) {
    return this.collectionsService.deleteMyCollection(id, user);
  }
}
