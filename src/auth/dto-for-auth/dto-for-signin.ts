import { CreateUserDto } from './dto-for-signup-user';
import { OmitType, PickType } from '@nestjs/mapped-types';
export class SignInUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
