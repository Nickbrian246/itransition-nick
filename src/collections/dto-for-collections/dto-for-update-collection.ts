import { IsString, IsOptional } from 'class-validator';
export class UpdateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageId: string;
}
