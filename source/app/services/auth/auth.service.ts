import { Injectable } from '@angular/core';

import { IUser } from '../../models/interfaces';

@Injectable
({
  providedIn: 'root'
})

export class AuthService
{
  private usersStorage: Array<IUser> = new Array;
  constructor(){}
  checkUser (user: IUser): boolean | null
  {
    const isUserExists = this.usersStorage.find((item: IUser) => item.login === user.login),
      isUserSaved = window.localStorage.getItem(user.login);
    if (isUserExists)
      return isUserExists.password === user.password
    else if (isUserSaved)
      return JSON.parse(isUserSaved).password === user.password
    else return null;
  }
  setUser (user: IUser, storage: boolean = false): boolean
  {
    const isUserExists = this.usersStorage.find((item: IUser) => item.login === user.login);
    if (!isUserExists)
    {
      this.usersStorage.push(user);
      if (storage)
        window.localStorage.setItem(user.login, JSON.stringify(user));
      return true;
    }
    else return false;
  }
}