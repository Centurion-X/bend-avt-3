// import from Angular framework
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import from RxJS library
import { debounceTime, fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
// import from application files
import { BorderDirective } from '../../../directives/border.directive';
import { ITour, ITourTypeSelect } from '../../../models/interfaces';
import { StorageService } from '../../../services/storage/storage.service';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component
({
  host: {'(document: keyup)': 'initKeyUp($event)'},
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild('list') list: ElementRef;
  @ViewChild('tourSearch') tourSearch: ElementRef;
  @ViewChild(BorderDirective) borderDirective: BorderDirective;
  public currentSearch: string;
  public isRendered: boolean = false;
  public tourSearchValue: string;
  public tours: Array<ITour>;
  public toursCopy: Array<ITour>;
  private destroyer = new Subject();
  constructor(private router: Router,
              private ticketService: TicketService,
              private ticketStorage: StorageService){}
  ngAfterViewInit(): void
  {
    const observerFromEvent = fromEvent(this.tourSearch.nativeElement, "keyup");
    observerFromEvent.pipe(debounceTime(100), takeUntil(this.destroyer)).subscribe(event =>
    {
      if (this.currentSearch !== this.tourSearchValue)
        this.renderBorder();
      if (this.tourSearchValue)
        this.tours = this.toursCopy.filter(tour =>
          tour.name.toLowerCase().includes(this.tourSearchValue.toLowerCase()) ? true : false);
      else
        this.tours = [...this.toursCopy];
      this.currentSearch = this.tourSearchValue;
    });
  }
  ngOnDestroy(): void
  {
    this.destroyer.next(true);
    this.destroyer.complete();
  }
  ngOnInit(): void
  {
    this.ticketService.getTours().subscribe((data: Array<ITour>) =>
    {
      this.tours = data;
      this.toursCopy = [...this.tours];
      this.ticketService.updateToursList(data);
      this.ticketStorage.setData(this.tours);
    });
    this.ticketService.ticketUpdateObservable.pipe(takeUntil(this.destroyer)).subscribe((data: Array<ITour>) => this.tours = data);
    this.ticketService.ticketObservable.pipe(takeUntil(this.destroyer)).subscribe((data: ITourTypeSelect): void =>
    {
      console.log('Фильтр: ', data);
      switch (data.value)
      {
        case 'all':
          this.tours = [...this.toursCopy];
          break;
        case 'multi':
          this.tours = this.toursCopy.filter((tour: ITour) => tour.type === 'multi');
          break;
        case 'single':
          this.tours = this.toursCopy.filter((tour: ITour) => tour.type === 'single');
          break;
      }
      if (data.date)
      {
        const dateWithoutTime: Array<string> = new Date(data.date).toISOString().split('T'),
              dateValue: string = dateWithoutTime[0];
        console.log('Date: ', dateValue);
        this.tours = this.toursCopy.filter((tour: ITour) => tour.date === dateValue);
      }
      this.renderBorder();
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
      if (tempArray.indexOf(item.name) == -1 && tempArray.indexOf(item.description) == -1)
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
    this.router.navigate(['/tickets/tour/'], {queryParams: {id: tour._id}});
  }
  renderBorder(): void
  {
    setTimeout(() =>
    {
      this.borderDirective.updateItems();
      this.borderDirective.resetBorder();
    });
  }
}