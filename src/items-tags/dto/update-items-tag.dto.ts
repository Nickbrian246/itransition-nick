import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsTagDto } from './create-items-tag.dto';

export class UpdateItemsTagDto extends PartialType(CreateItemsTagDto) {}
