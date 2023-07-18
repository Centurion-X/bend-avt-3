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
  private ticketUpdateSubject = new Subject<Array<ITour>>();
  readonly ticketObservable = this.ticketSubject.asObservable();
  readonly ticketUpdateObservable = this.ticketUpdateSubject.asObservable();
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
  createTour(data: any): Observable<any>
  {
    return this.ticketServiceRest.createTour(data);
  }
  createTours(): void
  {
    this.ticketServiceRest.createTours().subscribe((data: Array<ITour>) => this.updateToursList(data));
  }
  deleteTours(): void
  {
    this.ticketServiceRest.deleteTours().subscribe((data: Object) => this.updateToursList([]));
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
  getTourById(id: string): Observable<ITour>
  {
    return this.ticketServiceRest.getTourById(id);
  }
  getTours(): Observable <Array<ITour>>
  {
    return this.ticketServiceRest.getTours();
  }
  getToursByName(name: string): Observable <Array<ITour>>
  {
    return this.ticketServiceRest.getToursByName(name);
  }
  getUpcomingTours(): Observable<Array<ITourUpcoming>>
  {
    return this.ticketServiceRest.getUpcomingTours();
  }
  sendOrder(data: any): Observable<any>
  {
    return this.ticketServiceRest.sendData(data);
  }
  updateTours(type: ITourTypeSelect): void
  {
    this.ticketSubject.next(type);
  }
  updateToursList(data: Array<ITour>): void
  {
    this.ticketUpdateSubject.next(data);
  }
}