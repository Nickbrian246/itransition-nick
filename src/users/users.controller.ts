import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { errorHandler } from 'src/decorators/error-handler';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
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
