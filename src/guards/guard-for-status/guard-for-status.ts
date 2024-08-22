import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
import { UserDecoded } from 'src/types/user';
import { IS_PUBLIC_KEY } from 'src/decorators/public-route';
@Injectable()
export class StatusGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDecoded;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.checkUserStatus(user.id);
  }

  async checkUserStatus(userId: string): Promise<boolean> {
    const dbUser = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!dbUser) {
      throw new HttpException('UserNotfound', HttpStatus.NOT_FOUND);
    }

    if (dbUser.status === 'BLOCKED') {
      throw new HttpException('UserBlocked', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
