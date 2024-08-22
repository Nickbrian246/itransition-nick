import { IsArray, IsOptional, IsString } from 'class-validator';
import { CustomFieldDto } from 'src/custom-fields/dto-for-custom-fields';
import { CustomFieldsForItemDto } from './dto-for-create-custom-fields-for-item';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsString()
  collectionId: string;

  @IsArray()
  tagsIds: string[];

  @IsOptional()
  @IsArray()
  @Type(() => CustomFieldsForItemDto)
  customFields: CustomFieldsForItemDto[];
}
