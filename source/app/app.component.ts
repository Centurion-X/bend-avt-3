// import from Angular framework
import { Component, OnInit } from '@angular/core';
// import from application files
import { ConfigurationService } from './services/configuration/configuration.service';

@Component
({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
  public title = 'ticketSales2022';
  constructor(private configuration: ConfigurationService){}
  ngOnInit(): void {}
}