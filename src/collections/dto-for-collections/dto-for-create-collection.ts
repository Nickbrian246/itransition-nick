import { IsString, IsOptional } from 'class-validator';
export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  userId: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  imageId: string;
}

// export class CustomFieldDto {
//   @IsString()
//   id: string;

//   @IsString()
//   collectionId: string;

//   @IsString()
//   name: string;

//   @IsOptional()
//   @IsString()
//   valueStr: string | null;

//   @IsOptional()
//   @IsInt()
//   valueInt: number | null;

//   @IsOptional()
//   @IsBoolean()
//   valueBol: boolean | null;

//   @IsDate()
//   createdAt: Date;

//   @IsDate()
//   updatedAt: Date;
// }
