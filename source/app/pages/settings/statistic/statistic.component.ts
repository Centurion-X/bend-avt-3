// import from Angular framework
import { Component, OnInit } from '@angular/core';
// import from application files
import { ICustomStatisticUser } from '../../../models/pseudostatistic';
import { StatisticService } from '../../../services/statistic/statistic.service';

@Component
({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})

export class StatisticComponent implements OnInit
{
  columns =
  [
    {field: 'name', header: 'Имя'},
    {field: 'company', header: 'Компания'},
    {field: 'phone', header: 'Телефон'},
    {field: 'city', header: 'Город'},
    {field: 'street', header: 'Улица'}
  ];
  users: Array<ICustomStatisticUser>;
  constructor(private statisticService: StatisticService){}
  ngOnInit(): void
  {
    this.statisticService.getStatistic().subscribe((data: Array<ICustomStatisticUser>) =>
    {
      this.users = data;
    });
  }
}