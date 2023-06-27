// import from Angular framework
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import from RxJS library
import { Observable } from 'rxjs';
// import from application files
import { ITour, ITourLocation, ITourUpcoming } from '../../../models/interfaces';

@Injectable({providedIn: 'root'})

export class TicketRestService
{
  constructor(private http: HttpClient){}
  getError(): Observable<Array<ITour>>
  {
    return this.http.get<Array<ITour>>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }
  getLocations(): Observable <Array<ITourLocation>>
  {
    return this.http.get<Array<ITourLocation>>('assets/mocks/locations.json');
  }
  getRandomTour(type: number): Observable<ITourUpcoming>
  {
    return this.http.get<ITourUpcoming>('assets/mocks/tour' + type + '.json');
  }
  getTours(): Observable <Array<ITour>>
  {
    return this.http.get<Array<ITour>>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  }
  getUpcomingTours(): Observable<Array<ITourUpcoming>>
  {
    return this.http.get<Array<ITourUpcoming>>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/');
  }
  sendData(data: any): Observable<any>
  {
    return this.http.post('', data);
  }
}