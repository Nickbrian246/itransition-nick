import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from 'src/decorators/public-route';
import { PrismaService } from 'src/prisma.service';
import { TextSearchService } from './text-search.service';

@Controller('text-search')
export class TextSearchController {
  constructor(private textService: TextSearchService) {}

  @Public()
  @Get()
  getMatchedITems(@Query('text') text: string) {
    return this.textService.textSearch(text);
  }
}
