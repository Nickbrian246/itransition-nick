import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { PrismaClient } from '@prisma/client';
@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaClient],
})
export class TagsModule {}
