import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInUserDto } from './dto-for-auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(`signup`)
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @Post(`signin`)
  signin(@Body() createUser: SignInUserDto) {
    return this.authService.signin(createUser);
  }
}
