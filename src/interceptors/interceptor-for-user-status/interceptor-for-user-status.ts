import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { UserDecoded } from 'src/types/user';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class InterceptorForDefineOwner implements NestInterceptor {
  constructor(private prismaService: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      const { id } = request.user as UserDecoded;

      return from(
        this.prismaService.user.findFirstOrThrow({ where: { id } }),
      ).pipe(
        switchMap((user) => {
          if (user.status === 'BLOCKED') {
            throw new HttpException('User is blocked', HttpStatus.FORBIDDEN);
          }

          return next.handle();
        }),
      );
    }
    return next.handle();
  }
}
