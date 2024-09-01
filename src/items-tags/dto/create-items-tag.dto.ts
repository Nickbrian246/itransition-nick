import { IsString, IsArray } from 'class-validator';
export class CreateItemsTagDto {
  @IsString()
  itemId: string;

  @IsArray()
  tagsIds: string[];
}
