// import from Angular framework
import { Injectable } from '@angular/core';
// import from RxJS library
import { map, Observable } from 'rxjs';
// import from application files
import { IOrder, IOrderStatistic, ITour } from '../../models/interfaces';
import { StatisticRestService } from '../rest/statistic/statistic-rest.service';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})

export class StatisticService
{
  private tour: ITour | undefined;
  constructor(private statisticRestService: StatisticRestService,
              private tourService: StorageService,
              private userService: UserService){}
  getStatistic(): Observable<Array<IOrderStatistic>>
  {
    const tours = this.tourService.getData(),
          user = this.userService.getUser();
    return this.statisticRestService.getStatisticById(user._id).pipe(map((data: Array<IOrder>) =>
    {
      const newDataArray: Array<IOrderStatistic> = new Array;
      data.forEach((entry: IOrder) =>
      {
        this.tour = tours?.find(tour => tour._id === entry.tourId);
        const newDataObject: IOrderStatistic =
        {
          birthYear: entry.birthDay,
          cardNumber: entry.cardNumber,
          client: entry.firstName + ' ' + entry.lastName,
          // mail: user.mail,
          price: this.tour?.price,
          tour: this.tour?.name
        };
        newDataArray.push(newDataObject);
      })
      return newDataArray;
    }));
  }
}