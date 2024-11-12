import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { dictionaryOfErrorsByCode } from '../error-messages-dictionary/error-message-dictionary';
import { ErrorType } from 'src/types/error-types';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
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
    if (dictionaryOfErrorsByCode[code]) return dictionaryOfErrorsByCode[code]();
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred',
    };
  }
}
