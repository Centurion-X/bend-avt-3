import { Injectable } from '@angular/core';

import { ITour } from '../../models/interfaces';

@Injectable
({
  providedIn: 'root'
})

export class StorageService
{
  constructor(){}
  getData(): Array<ITour> | null
  {
    const data = window.sessionStorage.getItem('tours');
    if (data)
      return JSON.parse(data)
    else
      return null;
  }
  setData(data: Array<ITour>): void
  {
    window.sessionStorage.setItem('tours', JSON.stringify(data));
  }
}