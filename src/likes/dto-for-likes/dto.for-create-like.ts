import { IsString, isString } from 'class-validator';

export class LikeDto {
  @IsString()
  userId: string;

  @IsString()
  itemId: string;
}
