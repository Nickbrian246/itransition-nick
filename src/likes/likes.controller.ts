import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LikeDto } from './dto-for-likes';
import { LikesService } from './likes.service';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';

@Controller('likes')
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Get(':id')
  getLike(@Param('id') id: string, @GetUser() user: UserDecoded) {
    return this.likeService.getLikesByItemId(id, user);
  }
  // @Get()
  // getAllLikes() {
  //   return this.likeService.getAllLikes();
  // }

  @Post(':id')
  createLike(@Param('id') itemId: string, @GetUser() user: UserDecoded) {
    return this.likeService.createLike(itemId, user);
  }

  @Delete(':id')
  deleteLike(@Param('id') itemId: string, @GetUser() user: UserDecoded) {
    return this.likeService.deleteLike(itemId, user);
  }
}
