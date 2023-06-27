// import from Angular framework
import { Injectable } from '@angular/core';
// import from RxJS library
import { map, Observable } from 'rxjs';
// import from application files
import { ICustomStatisticUser, IStatisticUser } from '../../models/pseudostatistic';
import { StatisticRestService } from '../rest/statistic/statistic-rest.service';

@Injectable({providedIn: 'root'})

export class StatisticService
{
  constructor(private statisticRestService: StatisticRestService){}
  getStatistic(): Observable<Array<ICustomStatisticUser>>
  {
    return this.statisticRestService.getStatistic().pipe(map((data: Array<IStatisticUser>) =>
    {
      const newDataArray: Array<ICustomStatisticUser> = new Array;
      data.forEach((entry: IStatisticUser) =>
      {
        const newDataObject: ICustomStatisticUser =
        {
          city: entry.address.city,
          company: entry.company.name,
          id: entry.id,
          name: entry.name,
          phone: entry.phone,
          street: entry.address.street
        };
        newDataArray.push(newDataObject);
      })
      return newDataArray;
    }));
  }
}