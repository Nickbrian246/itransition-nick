import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minUppercase: 1,
      minLength: 8,
      minSymbols: 1,
    },
    { message: 'Incorrect Password' },
  )
  password: string;
}
