import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CustomFieldIdDto {
  @IsString()
  id: string;
}

export class DeleteManyCustomFieldsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldIdDto)
  customFields: CustomFieldIdDto[];
}
