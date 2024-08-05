import { OmitType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './dto-for-create-comments';

export class UpdateCommentDto extends OmitType(CreateCommentDto, [
  'itemId',
  'userId',
]) {}
