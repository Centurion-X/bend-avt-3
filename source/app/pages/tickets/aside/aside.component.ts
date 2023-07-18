// import from Angular framework
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import from PrimeNG library
import { MessageService } from 'primeng/api';
// import from application files
import { IMenuType, ITour, ITourTypeSelect } from '../../../models/interfaces';
import { SettingsService } from '../../../services/settings/settings.service';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component
({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit
{
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();
  public dateText: string = 'Дата';
  public filterText: string = 'Тип тура';
  public menuText: string = 'Тип меню';
  public menuType: IMenuType;
  public menuTypes: Array<IMenuType>;
  public theme: string = 'white';
  public tourTypes: Array<ITourTypeSelect> =
  [
    {label: 'все', value: 'all'},
    {label: 'групповой', value: 'multi'},
    {label: 'одиночный', value: 'single'}
  ];
  constructor(private messageService: MessageService,
              private settingsService: SettingsService,
              private ticketService: TicketService){}
  ngOnInit(): void
  {
    this.menuTypes =
    [
      {type: 'normal', label: 'Обычное'},
      {type: 'extend', label: 'Широкое'}
    ];
    this.menuType = this.menuTypes[1];
  }
  changeMenuType(event: {event: Event, value: IMenuType}): void
  {
    this.updateMenuType.emit(event.value);
  }
  changeTheme(): void
  {
    if (this.theme === 'white')
    {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      this.theme = 'black';
    }
    else
    {
      document.body.style.backgroundColor = 'white'
      document.body.style.color = 'black';
      this.theme = 'white';
    }
  }
  changeTourType(event: {event: Event, value: ITourTypeSelect}): void
  {
    this.ticketService.updateTours(event.value);
  }
  deleteAllTours(): void
  {
    this.ticketService.deleteTours();
  }
  initError(): void
  {
    this.ticketService.getError().subscribe
    ({
      next: data => {},
      error: error => this.messageService.add({detail: 'Ошибка на стороне сервера !!!', severity: 'error', summary: 'Ошибка сервера'})
    });
  }
  initSettings(): void
  {
    this.settingsService.loadSettingsSubject({token: false});
  }
  initTour(id: string): void
  {
    this.ticketService.getTourById(id).subscribe((data: ITour) => {});
  }
  initTours(): void
  {
    this.ticketService.createTours();
  }
  selectDate(event: string): void
  {
    this.ticketService.updateTours({date: event});
  }
}