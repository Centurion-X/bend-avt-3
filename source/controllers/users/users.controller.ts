// import from NestJS framework
import { AuthGuard } from '@nestjs/passport';
import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller, HttpException, HttpStatus } from '@nestjs/common';
// import from application files
import { User } from '../../shemas/user.shema';
import { UserDTO } from '../../DTO/user-dto';
import { UsersService } from '../../services/users/users.service';
/* eslint-disable prettier/prettier */
@Controller('users')
export class UsersController
{
  constructor(private userService: UsersService){}
  @Delete() deleteUsers(): Promise<object>
  {
    return this.userService.deleteUsers();
  }
  @Delete(':id') deleteUserById(@Param('id') id): Promise<User>
  {
    return this.userService.deleteUserById(id);
  }
  @Get() getAllUsers(): Promise<Array<User>>
  {
    return this.userService.getAllUsers();
  }
  @Get(':id') getUserById(@Param('id') id): Promise<User>
  {
    return this.userService.getUserById(id);
  }
  @Post() registerUser(@Body() data: UserDTO): Promise<User>
  {
    return this.userService.checkUserRegistration(data.login).then((result: Array<User>) =>
    {
      console.log('Registration data:', result);
      if (result.length === 0)
        return this.userService.registerUser(data);
      else
      {
        console.log('Error: this user is exists!')
        throw new HttpException({status: HttpStatus.CONFLICT, text: 'Такой пользователь уже зарегистрирован!'}, HttpStatus.CONFLICT);
      }
    });
  }
  @UseGuards(AuthGuard('local'))
  @Post(':login') authorizeUser(@Body() data: UserDTO, @Param('login') login): any
  {
    return this.userService.loginUser(data);
  }
  @Put(':id') updateUsers(@Param('id') id, @Body() data): Promise<User>
  {
    return this.userService.updateUser(id, data);
  }
}