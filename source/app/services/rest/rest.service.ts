import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITour } from '../../models/interfaces';

@Injectable
({
    providedIn: 'root'
})

export class TicketRestService
{
  constructor(private http: HttpClient){}
  getTickets(): Observable <Array<ITour>>
  {
    return this.http.get<Array<ITour>>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  }
}