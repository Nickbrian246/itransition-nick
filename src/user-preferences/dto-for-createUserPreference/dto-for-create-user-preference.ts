import { Language, Theme } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateUserPreferenceDto {
  @IsEnum(Theme)
  theme: Theme;

  @IsEnum(Language)
  language: Language;
}
