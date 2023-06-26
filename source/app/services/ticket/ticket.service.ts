import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITour } from '../../models/interfaces';
import { TicketRestService } from '../rest/rest.service';

@Injectable
({
  providedIn: 'root'
})

export class TicketService
{
  constructor (private ticketServiceRest: TicketRestService) {}
  getTickets(): Observable <Array<ITour>>
  {
    return this.ticketServiceRest.getTickets();
  }
}