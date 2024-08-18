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
  @Get()
  getLike(@Query() like: LikeDto, @GetUser() user: UserDecoded) {
    return this.likeService.getLikeByUserIdAndItemId(like, user);
  }
  // @Get()
  // getAllLikes() {
  //   return this.likeService.getAllLikes();
  // }

  @Post()
  createLike(@Body() like: LikeDto, @GetUser() user: UserDecoded) {
    return this.likeService.createLike(like, user);
  }

  @Delete()
  deleteLike(@Body() like: LikeDto, @GetUser() user: UserDecoded) {
    return this.likeService.deleteLike(like, user);
  }
}
