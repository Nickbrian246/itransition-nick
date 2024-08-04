import { TypeCustomField } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
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
