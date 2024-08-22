import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';
import { UsersDto, UpdateRolesDto } from './dto-for-user';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('user')
  getAuthUser(@GetUser() user: UserDecoded) {
    return this.usersService.getUserById(user.id);
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/collections')
  getUserByIdWithCollections(@Param('id') id: string) {
    return this.usersService.getUserByIdWithCollections(id);
  }

  @Patch('role')
  changeRoleByUsersIds(@Body() users: UpdateRolesDto) {
    return this.usersService.changeRoleByUsersIds(users);
  }

  @Patch('block')
  BlockByUserId(@Body() users: UsersDto) {
    return this.usersService.BlockByUsersIds(users);
  }
  @Patch('un-lock')
  unLockByUserId(@Body() role: UsersDto) {
    return this.usersService.unLockByUserId(role);
  }

  //TODO create new endpoint for delete users
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
