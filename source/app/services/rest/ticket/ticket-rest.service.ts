// import from Angular framework
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import from RxJS library
import { Observable } from 'rxjs';
// import from application files
import { IOrder, ITour, ITourLocation, ITourUpcoming } from '../../../models/interfaces';

@Injectable({providedIn: 'root'})

export class TicketRestService
{
  constructor(private http: HttpClient){}
  createTour(data: any): Observable<any>
  {
    return this.http.post('http://localhost:3000/tour/', data, {headers: {}});
  }
  createTours(): Observable <Array<ITour>>
  {
    return this.http.post<Array<ITour>>('http://localhost:3000/tours/', {});
  }
  deleteTours(): Observable<any>
  {
    return this.http.delete('http://localhost:3000/tours/');
  }
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
  getTourById(id: string): Observable<ITour>
  {
    return this.http.get<ITour>(`http://localhost:3000/tours/${id}`);
  }
  getTours(): Observable <Array<ITour>>
  {
    return this.http.get<Array<ITour>>('http://localhost:3000/tours/');
  }
  getToursByName(name: string): Observable <Array<ITour>>
  {
    return this.http.get<Array<ITour>>(`http://localhost:3000/tour/${name}`);
  }
  getUpcomingTours(): Observable<Array<ITourUpcoming>>
  {
    return this.http.get<Array<ITourUpcoming>>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/');
  }
  sendData(data: IOrder): Observable<any>
  {
    return this.http.post('http://localhost:3000/orders/', data);
  }
}