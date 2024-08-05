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

@Controller('likes')
export class LikesController {
  constructor(private likeService: LikesService) {}
  @Get()
  getLike(@Query() like: LikeDto) {
    return this.likeService.getLikeByUserIdAndItemId(like);
  }
  // @Get()
  // getAllLikes() {
  //   return this.likeService.getAllLikes();
  // }

  @Post()
  createLike(@Body() like: LikeDto) {
    return this.likeService.createLike(like);
  }

  @Delete()
  deleteLike(@Body() like: LikeDto) {
    return this.likeService.deleteLike(like);
  }
}
