import { IsString, isString } from 'class-validator';

export class LikeDto {
  @IsString()
  itemId: string;
}
