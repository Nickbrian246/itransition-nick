import { Injectable } from '@nestjs/common';
import { errorHandler } from 'src/decorators/error-handler';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomFieldsDto } from './dto-for-custom-field/dto-for-custom-field';

@Injectable()
export class CustomFieldService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async createMany(customFields: CreateCustomFieldsDto) {
    const fields = customFields.customFields.map((field) => ({
      collectionId: field.collectionId,
      name: field.name,
      value: field.value,
      type: field.type,
    }));

    await this.prismaService.customFields.createMany({ data: fields });
  }
}
