import { Module } from '@nestjs/common';
import { TextSearchController } from './text-search.controller';
import { TextSearchService } from './text-search.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TextSearchController],
  providers: [TextSearchService, PrismaService],
})
export class TextSearchModule {}
