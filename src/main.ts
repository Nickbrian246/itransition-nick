import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/guard-for-jwt';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaExceptionFilter } from './utils/exception-filters/exception';
import { AuthPrismaExceptionFilter } from './auth/utils/auth-exception-filters/auth-exception-filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(3001);
}
bootstrap();
