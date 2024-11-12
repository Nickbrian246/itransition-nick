import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import {
  AssociatedUserDto,
  CreateUserDto,
  SignInUserDto,
} from './dto-for-auth/';
import { PrismaService } from 'src/prisma.service';
import { handleAuthErrors } from 'src/decorators/handle-auth-errors';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import {
  AccessTokenAndProviderToken,
  ApiSuccessFullResponseWithMetaData,
  Token,
} from 'src/types/api-successful-response';
import { UserWithOutPassword } from 'src/types/user';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  // @handleAuthErrors()
  async signup(
    user: CreateUserDto,
  ): Promise<ApiSuccessFullResponseWithMetaData<UserWithOutPassword, Token>> {
    const passwordHashed = await hash(user.password, 5);
    const userCreated = await this.prismaService.user.create({
      data: { ...user, password: passwordHashed },
    });
    const access_token = await this.jwtService.signAsync({
      id: userCreated.id,
      email: userCreated.email,
      role: userCreated.role,
    });

    const data = {
      firstName: userCreated.firstName,
      email: userCreated.email,
      role: userCreated.role,
    };

    return {
      data,
      metaData: { access_token },
    };
  }

  // @handleAuthErrors()
  async signin(
    user: SignInUserDto,
  ): Promise<ApiSuccessFullResponseWithMetaData<UserWithOutPassword, Token>> {
    const dbUser = await this.prismaService.user.findFirstOrThrow({
      where: { email: user.email },
    });
    const IsMatchPassword = await compare(user.password, dbUser.password);
    if (!IsMatchPassword) throw new BadRequestException(`Incorrect password`);

    const access_token = await this.jwtService.signAsync({
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    });
    const data = {
      firstName: dbUser.firstName,
      email: dbUser.email,
      role: dbUser.role,
    };
    return { data, metaData: { access_token } };
  }

  // @handleAuthErrors()
  async validateUser(
    user: AssociatedUserDto,
  ): Promise<
    ApiSuccessFullResponseWithMetaData<
      UserWithOutPassword,
      AccessTokenAndProviderToken
    >
  > {
    const dbUser = await this.prismaService.user.upsert({
      where: { email: user.email },
      update: { email: user.email },
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
        credentialsOrigin: user.origin,
      },
    });

    const access_token = await this.jwtService.signAsync({
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    });
    const data = {
      firstName: dbUser.firstName,
      email: dbUser.email,
      role: dbUser.role,
    };

    return {
      data,
      metaData: { access_token, providerAccessToken: user.providerAccessToken },
    };
  }

  // @handleAuthErrors()
  async findUser(
    email: string,
  ): Promise<ApiSuccessFullResponseWithMetaData<UserWithOutPassword, Token>> {
    const dbUser = await this.prismaService.user.findFirstOrThrow({
      where: { email: email },
    });

    const access_token = await this.jwtService.signAsync({
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    });

    const data = {
      firstName: dbUser.firstName,
      email: dbUser.email,
      role: dbUser.role,
    };

    return { data, metaData: { access_token } };
  }
}
