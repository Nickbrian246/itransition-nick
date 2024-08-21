import {
  CustomFieldDto,
  CustomFieldItemDto,
} from 'src/custom-fields/dto-for-custom-fields';
import { IsString } from 'class-validator';

export class CustomFieldsForItemDto extends CustomFieldItemDto {
  @IsString()
  id: string;
  @IsString()
  value: string;
}
