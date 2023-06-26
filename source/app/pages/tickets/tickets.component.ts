import { Component, OnInit } from '@angular/core';

import { IMenuType } from '../../models/interfaces';

@Component
({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit
{
  public selectedType: IMenuType; 
  constructor(){}
  ngOnInit(): void {}
  updateSelectedType(event: IMenuType): void
  {
    this.selectedType = event;
  }
}