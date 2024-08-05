import { TypeCustomField } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
export class UpdateCustomFieldDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  @IsEnum(TypeCustomField)
  type: TypeCustomField;
}
