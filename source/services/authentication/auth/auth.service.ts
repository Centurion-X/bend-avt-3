// import from NestJS framework
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import from external libraries
import { Strategy } from 'passport-local';
// import from application files
import { UsersService } from '../../users/users.service';
/* eslint-disable prettier/prettier */
@Injectable()
export class AuthService extends PassportStrategy(Strategy)
{
  constructor(private userService: UsersService)
  {
    super({usernameField: 'login', passwordField: 'password'})
  }
  async validate(login: string, password: string): Promise<any>
  {
    const user = await this.userService.checkUserAuthorization(login, password);
    console.log('User:', user);
    if (!user)
      throw new HttpException({status: HttpStatus.NOT_FOUND, text: 'Такой пользователь не зарегистрирован!'}, HttpStatus.NOT_FOUND);
    else return true;
  }
}