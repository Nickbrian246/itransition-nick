import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { authDictionaryOfErrorsByCode } from './dictionary';
import { ErrorType } from 'src/types/error-types';

@Catch(Prisma.PrismaClientKnownRequestError)
export class AuthPrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { message, statusCode } = this.buildErrorMessage(exception.code);
    response.status(statusCode).json({
      statusCode,
      message,
    });
  }

  buildErrorMessage(code: string): ErrorType<HttpStatus> {
    if (authDictionaryOfErrorsByCode[code])
      return authDictionaryOfErrorsByCode[code]();
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred',
    };
  }
}
