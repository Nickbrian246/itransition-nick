import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { AssociatedUserDto } from '../dto-for-auth';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  serializeUser(user: AssociatedUserDto, done: Function) {
    console.log(user, 'serialize');

    done(null, user);
  }
  async deserializeUser(payload: AssociatedUserDto, done: Function) {
    try {
      console.log(payload, 'deserialize');

      const user = await this.authService.findUser(payload.email);
      return user ? done(null, user) : done(null, null);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
