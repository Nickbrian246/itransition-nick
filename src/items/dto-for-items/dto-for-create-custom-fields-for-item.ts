import {
  CreateCustomFieldsDto,
  CustomFieldDto,
} from 'src/custom-fields/dto-for-custom-fields';
import {} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CustomFieldsForItemDto extends OmitType(CustomFieldDto, [
  'collectionId',
]) {}
