import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handleAuthErrors() {
  return (
    target: any,
    propertyKey: any,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new HttpException(
              {
                message: 'This email is already registered.',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
          throw new HttpException(
            { message: `${error.message}` },
            HttpStatus.BAD_REQUEST,
          );
        }

        throw new HttpException(
          { message: `${error.message}` },
          HttpStatus.BAD_REQUEST,
        );
      }
    };
  };
}
