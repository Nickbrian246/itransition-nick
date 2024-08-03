import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInUserDto } from './dto-for-auth';
import { Public } from 'src/decorators/public-route';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post(`signup`)
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @Public()
  @Post(`signin`)
  signin(@Body() createUser: SignInUserDto) {
    return this.authService.signin(createUser);
  }
}
