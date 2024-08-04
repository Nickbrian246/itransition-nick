import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CustomFieldService } from './custom-field.service';
import { CreateCustomFieldsDto } from './dto-for-custom-field/dto-for-custom-field';

@Controller('custom-field')
export class CustomFieldController {
  constructor(private customFieldService: CustomFieldService) {}

  @Get()
  get() {}

  @Get()
  getAll() {}

  @Post()
  createMany(@Body() customFields: CreateCustomFieldsDto) {
    return this.customFieldService.createMany(customFields);
  }

  @Put()
  update() {}

  @Delete()
  deleteOne() {}

  delete() {}
}
