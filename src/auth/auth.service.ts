import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from './dto-for-auth/';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup(user: CreateUserDto) {
    try {
      const data = await this.prismaService.user.create({ data: user });
      return { data };
    } catch (error) {
      console.log(error);
      new ForbiddenException(error);
    }
  }
  signin(user: SignInUserDto) {
    return { user };
  }
}
