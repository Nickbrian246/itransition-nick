import { Injectable } from '@nestjs/common';
import { $Enums, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { errorHandler } from 'src/decorators/error-handler';
import { UpdateRolesDto, UsersDto } from './dto-for-user';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  @errorHandler()
  async getAllUsers(): Promise<
    ApiSuccessFullResponse<
      {
        firstName: string;
        lastName: string;
        email: string;
        status: $Enums.Status;
        role: $Enums.UserRole;
        createdAt: Date;
        id: string;
      }[]
    >
  > {
    const data = await this.prismaService.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        role: true,
        createdAt: true,
        id: true,
      },
    });
    return { data };
  }

  @errorHandler()
  async getUserById(
    id: string,
  ): Promise<
    ApiSuccessFullResponse<Pick<User, 'firstName' | 'email' | 'role'>>
  > {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: { id: id },
      include: { userPreferences: true },
    });
    const data = {
      email: user.email,
      firstName: user.firstName,
      role: user.role,
    };
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
  async changeRoleByUsersIds(roles: UpdateRolesDto) {
    const { role, usersIds } = roles;
    for (let user of usersIds) {
      await this.prismaService.user.update({
        where: { id: user },
        data: { role: role },
      });
    }
  }

  @errorHandler()
  async BlockByUsersIds(users: UsersDto) {
    const { usersIds } = users;
    for (let user of usersIds) {
      const data = await this.prismaService.user.update({
        where: { id: user },
        data: {
          status: 'BLOCKED',
        },
      });
    }
  }

  @errorHandler()
  async unLockByUserId(users: UsersDto) {
    const { usersIds } = users;
    for (let user of usersIds) {
      const data = await this.prismaService.user.update({
        where: { id: user },
        data: {
          status: 'ACTIVE',
        },
      });
    }
  }

  @errorHandler()
  async deleteUserById(id: string): Promise<ApiSuccessFullResponse<User>> {
    const collections = await this.prismaService.collection.findMany({
      where: { userId: id },
    });

    for (let collection of collections) {
      const items = await this.prismaService.item.findMany({
        where: { collectionId: collection.id },
      });
      for (let item of items) {
        await this.prismaService.comments.deleteMany({
          where: { itemId: item.id },
        });
        await this.prismaService.likes.deleteMany({
          where: { itemId: item.id },
        });
        await this.prismaService.item.delete({ where: { id: item.id } });
      }
      await this.prismaService.collection.delete({
        where: { id: collection.id },
      });
    }

    const data = await this.prismaService.user.delete({
      where: { id },
    });
    return { data };
  }
}
