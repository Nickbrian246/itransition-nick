import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/public-route';
@Injectable()
export class AtlassianGuard extends AuthGuard('atlassian') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (isPublic) {
    //   return true;
    // }

    const activate = (await super.canActivate(context)) as boolean;
    console.log(activate);

    const req = context.switchToHttp().getRequest();
    await super.logIn(req);
    return activate;
  }
}
