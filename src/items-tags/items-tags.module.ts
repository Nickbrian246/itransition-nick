import { Module } from '@nestjs/common';
import { ItemsTagsService } from './items-tags.service';
import { ItemsTagsController } from './items-tags.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ItemsTagsController],
  providers: [ItemsTagsService, PrismaService],
})
export class ItemsTagsModule {}
