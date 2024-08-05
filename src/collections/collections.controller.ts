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
import { Public } from 'src/decorators/public-route';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Public()
  @Get(':id')
  GetCollection(@Param('id') id: string) {
    return this.collectionsService.getCollectionById(id);
  }

  @Public()
  @Get('/:id/item')
  GetItemsFromCollection(@Param('id') id: string) {
    return this.collectionsService.getCollectionItemsById(id);
  }

  @Get('/:id/custom-fields')
  GetCollectionAndCustomFieldsById(@Param('id') id: string) {
    return this.collectionsService.getCollectionAndCustomFields(id);
  }

  @Get('')
  GetUserCollections(@GetUser() user: UserDecoded) {
    return this.collectionsService.getUserCollections(user);
  }

  @Post()
  createCollection(
    @Body() collection: CreateCollectionDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.collectionsService.createMy(collection, user);
  }

  @Put(':id')
  updateCollectionById(
    @Param('id') id: string,
    @Body() collection: UpdateCollectionDto,
  ) {
    return this.collectionsService.updateCollectionById(collection, id);
  }

  @Delete(':id')
  deleteCollectionById(@Param('id') id: string) {
    return this.collectionsService.getCollectionById(id);
  }
}