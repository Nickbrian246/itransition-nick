import { Module } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CustomFieldsController } from './custom-fields.controller';
import { PrismaService } from 'src/prisma.service';
@Module({
  providers: [CustomFieldsService, PrismaService],
  controllers: [CustomFieldsController],
})
export class CustomFieldsModule {}
