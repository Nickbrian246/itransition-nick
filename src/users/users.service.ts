import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { errorHandler } from 'src/decorators/error-handler';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getAllUsers(): Promise<ApiSuccessFullResponse<User[]>> {
    const data = await this.prismaService.user.findMany({});
    return { data };
  }

  @errorHandler()
  async getUserById(id: string): Promise<ApiSuccessFullResponse<User>> {
    const data = await this.prismaService.user.findFirstOrThrow({
      where: { id: id },
    });
    return { data };
  }

  @errorHandler()
  async getUserByIdWithCollections(
    id: string,
  ): Promise<ApiSuccessFullResponse<User>> {
    const data = await this.prismaService.user.findFirstOrThrow({
      where: { id },
      include: { collections: true },
    });
    return { data };
  }

  @errorHandler()
  async deleteUserById(id: string): Promise<ApiSuccessFullResponse<User>> {
    const data = await this.prismaService.user.delete({
      where: { id },
    });
    return { data };
  }
}
