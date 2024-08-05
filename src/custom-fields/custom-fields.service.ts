import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomFieldsDto,
  CustomFieldIdDto,
  UpdateCustomFieldByIdDto,
  UpdateCustomFieldDto,
} from './dto-for-custom-fields';
import { errorHandler } from 'src/decorators/error-handler';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { CustomFields } from '@prisma/client';

@Injectable()
export class CustomFieldsService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getCustomFieldsByCollectionId(
    id: string,
  ): Promise<ApiSuccessFullResponse<CustomFields[]>> {
    const data = await this.prismaService.customFields.findMany({
      where: { collectionId: id },
    });

    return { data };
  }

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

  @errorHandler()
  async updateCustomFieldById(id: string, customField: UpdateCustomFieldDto) {
    return await this.prismaService.customFields.update({
      where: { id: id },
      data: { ...customField },
    });
  }

  @errorHandler()
  async updateManyCustomFieldById(customFields: UpdateCustomFieldByIdDto[]) {
    const updatePromises = customFields.map((field) =>
      this.prismaService.customFields.update({
        where: { id: field.customFieldId },
        data: {
          name: field.name,
          value: field.value,
          type: field.type,
        },
      }),
    );
    return await this.prismaService.$transaction(updatePromises);
  }

  @errorHandler()
  async deleteById(id: string) {
    await this.prismaService.customFields.delete({ where: { id: id } });
  }

  @errorHandler()
  async deleteManyById(customFieldsId: CustomFieldIdDto[]) {
    console.log(customFieldsId);

    const data = customFieldsId.map((fieldId) =>
      this.prismaService.customFields.delete({ where: { id: fieldId.id } }),
    );
    return await this.prismaService.$transaction(data);
  }
}
