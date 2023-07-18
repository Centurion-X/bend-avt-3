// import from Angular framework
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import from RxJS library
import { Observable } from 'rxjs';
// import from application files
import { IOrder } from '../../../models/interfaces';

@Injectable({providedIn: 'root'})

export class StatisticRestService
{
  constructor(private http: HttpClient){}
  getStatistic(): Observable<Array<IOrder>>
  {
    return this.http.get<Array<IOrder>>('http://localhost:3000/orders/');
  }
  getStatisticById(id: string | undefined): Observable<Array<IOrder>>
  {
    return this.http.get<Array<IOrder>>(`http://localhost:3000/orders/${id}`);
  }
}