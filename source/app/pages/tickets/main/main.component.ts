import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BorderDirective } from '../../../directives/border.directive';
import { ITour } from '../../../models/interfaces';
import { StorageService } from '../../../services/storage/storage.service';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component
({
  host: {'(document: keyup)': 'initKeyUp($event)'},
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit
{
  @ViewChild('list') list: ElementRef;
  @ViewChild(BorderDirective) borderDirective: BorderDirective;
  public isRendered: boolean = false;
  public tours: Array<ITour>;
  constructor(private router: Router,
              private ticketService: TicketService,
              private ticketStorage: StorageService){}
  ngOnInit(): void
  {
    this.ticketService.getTickets().subscribe((data: Array<ITour>) => 
    {
      this.tours = this.filterData(data);
      this.ticketStorage.setData(this.tours);
    });
  }
  directiveIsRendered(event: boolean): void
  {
    this.isRendered = true;
  }
  filterData(data: Array<ITour>): Array<ITour>
  {
    let tempArray: Array<string> = new Array;
    data = data.filter((item) => tourCheck(item));
    return data;
    function tourCheck(item: any): boolean
    {
      if (tempArray.indexOf(item.name) === -1)
      {
        tempArray.push(item.name);
        return true;
      }
      else return false;
    }
  }
  initKeyUp(event: KeyboardEvent): void
  {
    if (event.code == 'Enter' || event.code == 'NumpadEnter')
      this.openInfoPage(this.tours[this.borderDirective.activeElementIndex]);
  }
  openInfoPage(tour: ITour): void
  {
    this.router.navigate(['/tickets/ticket/'], {queryParams: {id: tour.id}});
  }
}