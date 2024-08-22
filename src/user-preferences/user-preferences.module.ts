import { Module } from '@nestjs/common';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService, PrismaService],
})
export class UserPreferencesModule {}
