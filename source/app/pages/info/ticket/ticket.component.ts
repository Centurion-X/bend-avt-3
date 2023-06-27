// import from Angular framework
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import from RxJS library
import { forkJoin, fromEvent, Subscription } from 'rxjs';
// import from application files
import { ITour, ITourLocation, ITourUpcoming, IUser } from '../../../models/interfaces';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from '../../../services/user/user.service';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component
({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements AfterViewInit, OnDestroy, OnInit
{
  public form: FormGroup;
  public locations: Array<ITourLocation>;
  public ticketRestSubscription: Subscription;
  public ticketSearchSubscription: Subscription;
  public ticketSearchValue: string;
  public tour: ITour | undefined;
  public tours: Array<ITourUpcoming>;
  public toursCopy: Array<ITourUpcoming>;
  public user: IUser;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  constructor(private route: ActivatedRoute,
              private ticketService: TicketService,
              private ticketStorage: StorageService,
              private userService: UserService){}
  ngAfterViewInit(): void
  {
    this.form.controls['cardNumber'].setValue(this.user?.card);
    const observerFromEvent = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.ticketSearchSubscription = observerFromEvent.subscribe( event =>
    {
      this.initSearchTour();
    });
  }
  ngOnDestroy(): void
  {
    this.ticketSearchSubscription.unsubscribe();
  }
  ngOnInit(): void
  {
    const queryId = this.route.snapshot.paramMap.get('id'),
          routeId = this.route.snapshot.queryParamMap.get('id'),
          valueId = queryId || routeId;
    this.form = new FormGroup
    ({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDay: new FormControl(),
      cardNumber: new FormControl(),
      citizenship: new FormControl()
    });
    this.user = this.userService.getUser();
    if (valueId)
    {
      const ticketStorage = this.ticketStorage.getData();
      if (ticketStorage)
        this.tour = ticketStorage.find(tour => tour.id === valueId);
    }
    forkJoin([this.ticketService.getUpcomingTours(), this.ticketService.getLocations()]).subscribe(data =>
    {
      this.locations = data[1];
      this.tours = this.ticketService.addLocation(data[0], data[1]);
      this.toursCopy = this.tours;
    });
  }
  initSearchTour(): void
  {
    const type = Math.ceil(Math.random() * 3);
    if (this.ticketRestSubscription && !this.ticketSearchSubscription.closed)
      this.ticketRestSubscription.unsubscribe();
    this.ticketRestSubscription = this.ticketService.getRandomTour(type).subscribe((data: any) =>
    {
      if (this.ticketSearchValue)
        this.tours = this.ticketService.addLocation([data], this.locations);
      else
        this.tours = this.toursCopy;
    })    
  }
  initTour(): void
  {
    const userData = this.form.getRawValue(),
          postData = {...this.tour, ...userData};
    console.log('Data:', postData);
    console.log(userData);
    this.ticketService.sendTicket(postData).subscribe();
  }
  onSubmit(): void {}
  selectDate(event: Date): void {}
}