import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { TypeCustomField } from '@prisma/client';
import { Type } from 'class-transformer';
export class CustomFieldDto {
  @IsString()
  collectionId: string;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  @IsEnum(TypeCustomField)
  type: TypeCustomField;
}

export class CreateCustomFieldsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields: CustomFieldDto[];
}
