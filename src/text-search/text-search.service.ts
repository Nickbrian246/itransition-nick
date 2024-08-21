import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { errorHandler } from 'src/decorators/error-handler';
import { Public } from 'src/decorators/public-route';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';

@Injectable()
export class TextSearchService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async textSearch(text: string): Promise<ApiSuccessFullResponse<any>> {
    const data = await this.prismaService.item.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: 'itemautocomplete',
            autocomplete: {
              query: text,
              path: 'name',
              fuzzy: {
                maxEdits: 1,
                prefixLength: 1,
                maxExpansions: 50,
              },
            },
          },
        },
        {
          $limit: 10,
        },
      ],
    });

    return { data };
  }
}
