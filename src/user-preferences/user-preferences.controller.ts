import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';
import { CreateUserPreferenceDto } from './dto-for-createUserPreference/dto-for-create-user-preference';
import { UserPreferencesService } from './user-preferences.service';

@Controller('user-preferences')
export class UserPreferencesController {
  constructor(private userPreferenceService: UserPreferencesService) {}

  @Get(':id')
  get(@Param() id: string) {
    return this.userPreferenceService.getUserPreferenceById(id);
  }

  @Post()
  create(
    @Body() preference: CreateUserPreferenceDto,
    @GetUser() user: UserDecoded,
  ) {
    return this.userPreferenceService.createOrUpdate(preference, user);
  }
}
