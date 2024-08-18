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
import { CreateCommentDto, UpdateCommentDto } from './dto-for-comments';
import { CommentsService } from './comments.service';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Public()
  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentsService.getCommentById(id);
  }
  @Public()
  @Get('/item/:id')
  getCommentsByItemId(@Param('id') id: string) {
    return this.commentsService.getCommentsByItemId(id);
  }

  @Post()
  createComment(
    @Body() comment: CreateCommentDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.commentsService.createComment(comment, user);
  }

  @Put(':id')
  updateCommentById(
    @Param('id') id: string,
    @Body() comment: UpdateCommentDto,
  ) {
    return this.commentsService.updateCommentById(id, comment);
  }

  @Delete(':id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentsService.deleteCommentById(id);
  }
}
