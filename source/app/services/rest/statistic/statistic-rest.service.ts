// import from Angular framework
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import from RxJS library
import { Observable } from 'rxjs';
// import from application files
import { IStatisticUser } from '../../../models/pseudostatistic';

@Injectable({providedIn: 'root'})

export class StatisticRestService
{
  constructor(private http: HttpClient){}
  getStatistic(): Observable<Array<IStatisticUser>>
  {
    return this.http.get<Array<IStatisticUser>>('https://jsonplaceholder.typicode.com/users');
  }
}