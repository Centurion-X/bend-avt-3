// import from Angular framework
import { Injectable } from '@angular/core';
// import from application files
import { IUser } from '../../models/interfaces';

@Injectable({providedIn: 'root'})

export class UserService
{
  private token: null | string;
  private user: IUser;
  constructor(){}
  getToken(): null | string
  {
    if (!this.token)
      this.token = window.sessionStorage.getItem('token');
    return this.token;
  }
  getUser(): IUser
  { 
    if (!this.user)
    {
      const user: null | string = window.sessionStorage.getItem('user');
      if (user)
        this.user = JSON.parse(user);
    }
    return this.user;
  }
  removeToken(): void
  {
    window.sessionStorage.removeItem('token');
  }
  removeUser(): void
  {
    window.sessionStorage.removeItem('user');
  }
  setToken(token: string): void
  {
    this.token = token;
    window.sessionStorage.setItem('token', token);
  }
  setUser(user: IUser): void
  {
 	  this.user = user;
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }
}