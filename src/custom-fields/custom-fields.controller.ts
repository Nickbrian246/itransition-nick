import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldsDto } from './dto-for-custom-fields';

@Controller('custom-fields')
export class CustomFieldsController {
  constructor(private customFieldsService: CustomFieldsService) {}

  @Get()
  get() {}

  @Get()
  getAll() {}

  @Post()
  createMany(@Body() customFields: CreateCustomFieldsDto) {
    return this.customFieldsService.createManyCustomFields(customFields);
  }

  @Put()
  update() {}

  @Delete()
  deleteOne() {}

  delete() {}
}
