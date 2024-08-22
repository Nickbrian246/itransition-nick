import { IsArray } from 'class-validator';

export class UsersDto {
  @IsArray()
  usersIds: string[];
}
