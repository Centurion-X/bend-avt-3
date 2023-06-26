import { Injectable } from '@angular/core';

import { IUser } from '../../models/interfaces';

@Injectable
({
  providedIn: 'root'
})

export class UserService
{
  private user: IUser;
  constructor(){}
  getUser(): IUser
  { 
    if (!this.user)
    {
      const user = window.sessionStorage.getItem('user');
      if (user)
        this.user = JSON.parse(user);
    }
    return this.user;
  }
  setUser(user: IUser): void
  {
 	  this.user = user;
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }
}