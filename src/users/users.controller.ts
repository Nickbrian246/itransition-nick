import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/decorators/get-user';
import { UserDecoded } from 'src/types/user';
import { UsersDto, UpdateRolesDto } from './dto-for-user';
import { AdminRoleGuard } from 'src/guards/guard-for-role/guard-for-admin-role';

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

  @UseGuards(AdminRoleGuard)
  @Patch('role')
  changeRoleByUsersIds(@Body() users: UpdateRolesDto) {
    return this.usersService.changeRoleByUsersIds(users);
  }

  @UseGuards(AdminRoleGuard)
  @Patch('block')
  BlockByUserId(@Body() users: UsersDto) {
    return this.usersService.BlockByUsersIds(users);
  }

  @UseGuards(AdminRoleGuard)
  @Patch('un-lock')
  unLockByUserId(@Body() role: UsersDto) {
    return this.usersService.unLockByUserId(role);
  }

  //TODO create new endpoint for delete users
  @UseGuards(AdminRoleGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
