import { IsArray, IsOptional, IsString } from 'class-validator';
import { CustomFieldDto } from 'src/custom-fields/dto-for-custom-fields';
import { CustomFieldsForItemDto } from './dto-for-create-custom-fields-for-item';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  collectionId: string;

  @IsString()
  tagId: string;

  @IsOptional()
  @IsArray()
  @Type(() => CustomFieldsForItemDto)
  customFields: CustomFieldsForItemDto[];
}
