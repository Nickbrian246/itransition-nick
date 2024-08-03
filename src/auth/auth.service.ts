import { Injectable } from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from './dto-for-auth/';
import { PrismaService } from 'src/prisma.service';
import { handleAuthErrors } from 'src/decorators/handle-auth-errors';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  @handleAuthErrors()
  async signup(user: CreateUserDto) {
    const passwordHashed = await hash(user.password, 5);
    const userCreated = await this.prismaService.user.create({
      data: { ...user, password: passwordHashed },
    });
    return {
      data: {
        access_token: await this.jwtService.signAsync({
          id: userCreated.id,
          email: userCreated.email,
          role: userCreated.role,
        }),
      },
    };
  }

  @handleAuthErrors()
  async signin(user: SignInUserDto) {
    const dbUser = await this.prismaService.user.findFirstOrThrow({
      where: { email: user.email },
    });
    const IsMatchPassword = await compare(user.password, dbUser.password);
    if (!IsMatchPassword)
      throw new Error(`Incorrect password for ${user.email} email`);
    return { user };
  }
}
