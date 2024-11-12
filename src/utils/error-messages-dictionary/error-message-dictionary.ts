import { HttpStatus } from '@nestjs/common';
import { ErrorType } from 'src/types/error-types';
export const dictionaryOfErrorsByCode: Record<
  string,
  (message?: string) => ErrorType<HttpStatus>
> = {
  P2002: (message?: string) => {
    let msg = message ?? 'A record with this unique field already exists';
    return {
      statusCode: HttpStatus.CONFLICT,
      message: msg,
    };
  },
  P2025: (message?: string) => {
    let msg = message ?? 'Record not found';
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: msg,
    };
  },
  P2023: (message?: string) => {
    let msg = message ?? 'Invalid id';
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: msg,
    };
  },
};
