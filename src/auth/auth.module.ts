import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { AtlassianStrategy } from './strategy/atlassian-jira';
import { SessionSerializer } from './utils/serialize.auth';
import { GoogleAuthStrategy } from './strategy/google-strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    AtlassianStrategy,
    GoogleAuthStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
