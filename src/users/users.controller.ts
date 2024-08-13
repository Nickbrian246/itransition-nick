import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { errorHandler } from 'src/decorators/error-handler';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('user')
  getUserById(@Param('id') id: string, @GetUser() user: UserDecoded) {
    return this.usersService.getUserById(user.id);
  }

  @Get(':id/collections')
  getUserByIdWithCollections(@Param('id') id: string) {
    return this.usersService.getUserByIdWithCollections(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
