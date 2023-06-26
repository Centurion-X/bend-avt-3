import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { IMenuType, IUser } from '../../../models/interfaces';
import { UserService } from '../../../services/user/user.service';

@Component
({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnChanges, OnDestroy, OnInit
{
  @Input() menuType: IMenuType;
  private settingsActive: boolean = false;
  private timeInterval: number;
  public items: Array<MenuItem>;
  public time: Date;
  public user: IUser;
  constructor(private userService: UserService){}
  ngOnChanges(changes: SimpleChanges): void
  {
    this.settingsActive = this.menuType?.type === "extend";
    this.items = this.initMenuItems();
  }
  ngOnDestroy(): void
  {
    if (this.timeInterval)
        window.clearInterval(this.timeInterval);
  }
  ngOnInit(): void
  {
    this.items = this.initMenuItems();
    this.timeInterval = window.setInterval(() => this.time = new Date(), 1000);
    this.user = this.userService.getUser();
  }
  initMenuItems(): Array<MenuItem>
  {
    return [{
      label: 'Билеты',
      routerLink:['main']
    },
    {
      label: 'Настройки',
      routerLink:['settings'],
      visible: this.settingsActive
    },
    {
      label: 'Выйти',
      routerLink:['/auth']
    }];
  }
}