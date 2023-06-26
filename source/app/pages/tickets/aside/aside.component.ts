import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { IMenuType } from '../../../models/interfaces';

@Component
({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit
{
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();
  public menuText: string = 'Тип меню';
  public menuType: IMenuType;
  public menuTypes: Array<IMenuType>;
  constructor(){}
  ngOnInit(): void
  {
    this.menuTypes =
    [
      {type: 'normal', label: 'Обычное'},
      {type: 'extend', label: 'Широкое'}
    ];
  }
  changeType(event: {event: Event, value: IMenuType}): void
  {
    this.updateMenuType.emit(event.value);
  }
}