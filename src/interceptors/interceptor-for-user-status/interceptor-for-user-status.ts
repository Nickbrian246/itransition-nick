import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDecoded } from 'src/types/user';
@Injectable()
export class InterceptorForDefineOwner implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.user && request.body) {
      const { id } = request.user as UserDecoded;
      if (!request.body.userId || request.body.userId === null) {
        request.body.userId = id;
      }
    }

    return next.handle();
  }
}
