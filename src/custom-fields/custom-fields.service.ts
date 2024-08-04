import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomFieldsDto } from './dto-for-custom-fields';
import { errorHandler } from 'src/decorators/error-handler';

@Injectable()
export class CustomFieldsService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async createManyCustomFields(customFields: CreateCustomFieldsDto) {
    const fields = customFields.customFields.map((field) => ({
      collectionId: field.collectionId,
      name: field.name,
      value: field.value,
      type: field.type,
    }));

    await this.prismaService.customFields.createMany({ data: fields });
  }
}
