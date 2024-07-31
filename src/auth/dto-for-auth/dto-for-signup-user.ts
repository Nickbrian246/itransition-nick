import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name can not be empty' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name can not be empty' })
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minUppercase: 1,
    minLength: 8,
    minSymbols: 1,
  })
  password: string;
}
