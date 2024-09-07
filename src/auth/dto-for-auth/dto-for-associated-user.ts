import { CredentialsOrigin, Language } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class AssociatedUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(CredentialsOrigin)
  origin: CredentialsOrigin;

  @IsEnum(Language)
  locale: string;

  @IsString()
  providerAccessToken: string;
}
