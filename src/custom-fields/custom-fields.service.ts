import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomFieldsDto,
  CustomFieldIdDto,
  UpdateCustomFieldByIdDto,
  UpdateCustomFieldDto,
} from './dto-for-custom-fields';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { CustomFields } from '@prisma/client';

@Injectable()
export class CustomFieldsService {
  constructor(private prismaService: PrismaService) {}

  async getCustomFieldsByCollectionId(
    id: string,
  ): Promise<ApiSuccessFullResponse<CustomFields[]>> {
    const data = await this.prismaService.customFields.findMany({
      where: { collectionId: id },
    });

    return { data };
  }

  async createManyCustomFields(customFields: CreateCustomFieldsDto) {
    if (customFields.customFields.length === 0) return;
    const fields = customFields.customFields.map((field) => ({
      collectionId: field.collectionId,
      name: field.name,
      type: field.type,
    }));

    await this.prismaService.customFields.createMany({ data: fields });
  }

  async updateCustomFieldById(id: string, customField: UpdateCustomFieldDto) {
    return await this.prismaService.customFields.update({
      where: { id: id },
      data: { ...customField },
    });
  }

  async updateManyCustomFieldById(customFields: UpdateCustomFieldByIdDto[]) {
    const updatePromises = customFields.map((field) =>
      this.prismaService.customFields.update({
        where: { id: field.customFieldId },
        data: {
          name: field.name,
          type: field.type,
        },
      }),
    );
    return await this.prismaService.$transaction(updatePromises);
  }

  async deleteById(id: string) {
    await this.prismaService.customFields.delete({ where: { id: id } });
  }

  async deleteManyById(customFieldsId: CustomFieldIdDto[]) {
    const data = customFieldsId.map((fieldId) =>
      this.prismaService.customFields.delete({ where: { id: fieldId.id } }),
    );
    return await this.prismaService.$transaction(data);
  }
}
