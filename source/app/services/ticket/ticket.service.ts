// import from Angular framework
import { Injectable } from '@angular/core';
// import from RxJS library
import { map, Observable, Subject } from 'rxjs';
// import from application files
import { ITour, ITourLocation, ITourTypeSelect, ITourUpcoming } from '../../models/interfaces';
import { TicketRestService } from '../rest/ticket/ticket-rest.service';

@Injectable({providedIn: 'root'})

export class TicketService
{
  private ticketSubject = new Subject<ITourTypeSelect>();
  constructor (private ticketServiceRest: TicketRestService) {}
  addLocation(data: Array<ITourUpcoming>, location: Array<ITourLocation>): Array<ITourUpcoming>
  {
    data.forEach((item) =>
    {
      const value: ITourLocation | undefined = location.find(entry => entry.id === item.locationId);
      if (value)
        item.locationName = value.name;
    });
    return data;
  }
  getError(): Observable<any>
  {
    return this.ticketServiceRest.getError();
  }
  getLocations(): Observable<Array<ITourLocation>>
  {
    return this.ticketServiceRest.getLocations();
  }
  getRandomTour(type: number): Observable<ITourUpcoming>
  {
    return this.ticketServiceRest.getRandomTour(type);
  }
  getTickets(): Observable <Array<ITour>>
  {
    return this.ticketServiceRest.getTours().pipe(map((data: Array<ITour>) =>
    {
        const singleTours: Array<ITour> = data.filter((el) => el.type === 'single');
        return data.concat(singleTours);
    }));
  }
  getTicketType(): Observable <ITourTypeSelect>
  {
    return this.ticketSubject.asObservable(); 
  }
  getUpcomingTours(): Observable<Array<ITourUpcoming>>
  {
    return this.ticketServiceRest.getUpcomingTours();
  }
  sendTicket(data: any): Observable<any>
  {
    return this.ticketServiceRest.sendData(data);
  }
  updateTours(type: ITourTypeSelect): void
  {
    this.ticketSubject.next(type);
  }
}