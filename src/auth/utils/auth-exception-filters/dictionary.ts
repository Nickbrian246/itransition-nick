import { HttpStatus } from '@nestjs/common';
import { ErrorType } from 'src/types/error-types';
export const authDictionaryOfErrorsByCode: Record<
  string,
  (message?: string) => ErrorType<HttpStatus>
> = {
  P2002: (message?: string) => {
    let msg = message ?? 'Email duplicated';
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
};
