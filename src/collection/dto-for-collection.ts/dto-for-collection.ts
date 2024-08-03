import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  validate,
  ValidateNested,
} from 'class-validator';
import { CustomFields } from '@prisma/client';
import { Type } from 'class-transformer';

export class CustomFieldDto {
  @IsString()
  id: string;

  @IsString()
  collectionId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  valueStr: string | null;

  @IsOptional()
  @IsInt()
  valueInt: number | null;

  @IsOptional()
  @IsBoolean()
  valueBol: boolean | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  imageId: string;
}
export class UpdateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageId: string;
}
