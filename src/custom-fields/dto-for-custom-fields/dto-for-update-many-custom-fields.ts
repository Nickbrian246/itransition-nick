import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { UpdateCustomFieldDto } from './dto-for-update-custom-field';

export class UpdateCustomFieldByIdDto extends UpdateCustomFieldDto {
  @IsString()
  customFieldId: string;
}

export class UpdateManyCustomFields {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCustomFieldByIdDto)
  customFields: UpdateCustomFieldByIdDto[];
}
