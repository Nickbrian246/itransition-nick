import { OmitType } from '@nestjs/mapped-types';
import { CreateItemDto } from './dto-for-create-Item';
export class UpdateItemDto extends OmitType(CreateItemDto, ['collectionId']) {}
