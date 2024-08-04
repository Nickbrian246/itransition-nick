import { Module } from '@nestjs/common';
import { CustomFieldService } from './custom-field.service';
import { CustomFieldController } from './custom-field.controller';
import { PrismaService } from 'src/prisma.service';
@Module({
  providers: [CustomFieldService, PrismaService],
  controllers: [CustomFieldController],
})
export class CustomFieldModule {}
