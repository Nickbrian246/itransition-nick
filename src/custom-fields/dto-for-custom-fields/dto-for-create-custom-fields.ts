import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CustomFieldDto } from './dto-for-custom-field';

export class CreateCustomFieldsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields: CustomFieldDto[];
}
