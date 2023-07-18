// import from Angular framework
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import from application files
import { IOrderStatistic } from '../../../models/interfaces';
import { StatisticService } from '../../../services/statistic/statistic.service';

@Component
({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})

export class StatisticComponent implements OnInit
{
  public columns =
  [
    {field: 'client', header: 'Клиент'},
    // {field: 'mail', header: 'Почта'},
    {field: 'birthYear', header: 'Год рождения'},
    {field: 'tour', header: 'Тур'},
    {field: 'price', header: 'Стоимость'}
  ];
  public orders: Array<any>;
  constructor(private date: DatePipe,
              private statisticService: StatisticService){}
  ngOnInit(): void
  {
    this.statisticService.getStatistic().subscribe((data: Array<IOrderStatistic>) =>
    {
      data.forEach((order: IOrderStatistic) => order.birthYear = this.date.transform(order.birthYear, 'YYYY'));
      this.orders = data;
    });
  }
}