import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/decorators/public-route';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto-for-collection.ts/dto-for-collection';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Public()
  @Get(':id')
  collection(@Param() id: string) {}

  @Get()
  collections(@GetUser() user: UserDecoded) {
    console.log(user);

    return this.collectionService.getMyCollections(user);
  }

  @Post()
  create(
    @Body() collection: CreateCollectionDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.collectionService.createMy(collection, user);
  }

  @Put(':id')
  update(@Param() id: string) {
    return { id };
  }

  @Delete(':id')
  delete(@Param() id: string) {
    console.log(id);

    return { id };
  }
}
