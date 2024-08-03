import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCollectionDto } from './dto-for-collection.ts/dto-for-collection';
import { errorHandler } from 'src/decorators/error-handler';
import { UserDecoded } from 'src/types/user';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  @errorHandler()
  async createMy(collection: CreateCollectionDto, user: UserDecoded) {
    await this.prisma.collection.create({
      data: {
        userId: user.id,
        ...collection,
        category: { connect: { id: collection.category } },
        customFields: {},
      },
    });
  }

  @errorHandler()
  async getMyCollections(user: UserDecoded) {
    return await this.prisma.collection.findFirstOrThrow({
      where: { userId: user.id },
    });
  }
}
