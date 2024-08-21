import { IsString, IsOptional } from 'class-validator';
export class UpdateCollectionDto {
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
