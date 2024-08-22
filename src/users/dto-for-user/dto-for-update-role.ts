import { UserRole } from '@prisma/client';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class UpdateRolesDto {
  @IsArray()
  usersIds: string[];

  @IsEnum(UserRole)
  role: UserRole;
}
