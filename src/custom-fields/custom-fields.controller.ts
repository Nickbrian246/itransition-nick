import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import {
  CreateCustomFieldsDto,
  DeleteManyCustomFieldsDto,
  UpdateCustomFieldDto,
  UpdateManyCustomFields,
} from './dto-for-custom-fields';

@Controller('custom-fields')
export class CustomFieldsController {
  constructor(private customFieldsService: CustomFieldsService) {}

  @Get(':id')
  getCustomFieldsByCollectionId(@Param('id') id: string) {
    return this.customFieldsService.getCustomFieldsByCollectionId(id);
  }

  @Post()
  createManyCustomFields(@Body() customFields: CreateCustomFieldsDto) {
    return this.customFieldsService.createManyCustomFields(customFields);
  }

  @Put(':id')
  updateCustomFieldById(
    @Param('id') id: string,
    @Body() customField: UpdateCustomFieldDto,
  ) {
    return this.customFieldsService.updateCustomFieldById(id, customField);
  }

  @Put()
  updateManyCustomFieldById(@Body() customFields: UpdateManyCustomFields) {
    return this.customFieldsService.updateManyCustomFieldById(
      customFields.customFields,
    );
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    this.customFieldsService.deleteById(id);
  }

  @Delete('')
  deleteManyById(@Body() fieldsId: DeleteManyCustomFieldsDto) {
    return this.customFieldsService.deleteManyById(fieldsId.customFields);
  }
}
