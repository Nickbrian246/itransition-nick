import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserPreferenceDto } from './dto-for-createUserPreference/dto-for-create-user-preference';
import { UserDecoded } from 'src/types/user';
import { ApiSuccessFullResponse } from 'src/types/api-successful-response';
import { $Enums, UserPreferences } from '@prisma/client';

@Injectable()
export class UserPreferencesService {
  constructor(private prismaService: PrismaService) {}

  async getUserPreferenceById(
    id: string,
  ): Promise<ApiSuccessFullResponse<UserPreferences>> {
    const data = await this.prismaService.userPreferences.findFirstOrThrow({
      where: { id },
    });

    return { data };
  }

  async createOrUpdate(
    preference: CreateUserPreferenceDto,
    user: UserDecoded,
  ): Promise<
    ApiSuccessFullResponse<{
      language: $Enums.Language;
      theme: $Enums.Theme;
    }>
  > {
    const data = await this.prismaService.userPreferences.upsert({
      where: { userId: user.id },
      update: {
        language: preference.language,
        theme: preference.theme,
      },
      create: {
        userId: user.id,
        language: preference.language,
        theme: preference.theme,
      },
      select: { theme: true, language: true },
    });
    return { data };
  }
}
