import { HttpStatus } from '@nestjs/common';

export interface ErrorType<T> {
  statusCode: T;
  message: string;
}
