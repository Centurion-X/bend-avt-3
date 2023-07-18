// import from application files
import { IUser } from '../interfaces/user';
/* eslint-disable prettier/prettier */
export class UserDTO implements IUser
{
  cardNumber: string;
  email: string;
  id?: string;
  login: string;
  password: string;
}