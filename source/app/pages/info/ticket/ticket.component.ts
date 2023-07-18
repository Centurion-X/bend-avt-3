// import from Angular framework
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
// import from RxJS library
import { fromEvent, Subscription } from 'rxjs';
// import from PrimeNG library
import { MessageService } from 'primeng/api';
// import from application files
import { IOrder, ITour, ITourLocation, IUser } from '../../../models/interfaces';
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
  public tour: ITour | undefined;
  public tourSearchValue: string;
  public tours: Array<ITour> = new Array;
  public toursCopy: Array<ITour> = new Array;
  public user: IUser;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  constructor(private route: ActivatedRoute,
              private messageService: MessageService,
              private ticketService: TicketService,
              private ticketStorage: StorageService,
              private userService: UserService)
  {
    const tours = this.ticketStorage.getData();
    for (let index = 0; index < 10; index++)
    {
      if (tours && tours[index])
      {
        this.tours.push(tours[index]);
        this.toursCopy.push(tours[index]);
      }
    }      
  }
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
      age: new FormControl(),
      birthDay: new FormControl(),
      cardNumber: new FormControl()
    });
    this.user = this.userService.getUser();
    if (valueId)
    {
      const ticketStorage = this.ticketStorage.getData();
      if (ticketStorage)
        this.tour = ticketStorage.find(tour => tour._id === valueId);
    }
  }
  initSearchTour(): void
  {
    if (this.ticketRestSubscription && !this.ticketSearchSubscription.closed)
      this.ticketRestSubscription.unsubscribe();
    if (this.tourSearchValue.length > 1)
      this.ticketRestSubscription = this.ticketService.getToursByName(this.tourSearchValue.trim()).subscribe
      ({
        next: (data: Array<ITour>) => this.tours = data,
        error: (error: HttpErrorResponse) => this.tours = this.toursCopy
      })
    else
      this.tours = this.toursCopy;
  }
  initTour(): void
  {
    const formData = this.form.getRawValue(),
          orderData = {...this.tour, ...formData};
    console.log('Data:', formData);
    console.log('Order:', orderData);
    const userId = this.userService.getUser()?._id || null,
          userOrder: IOrder =
          {
            age: orderData.age,
            birthDay: orderData.birthDay,
            cardNumber: orderData.cardNumber,
            firstName: orderData.firstName,
            lastName: orderData.lastName,
            tourId: orderData._id,
            userId: userId
          };
    this.ticketService.sendOrder(userOrder).subscribe
    ({
      next: data => this.messageService.add({detail: 'Заказ оформлен !', severity: 'success', summary: 'Операция выполнена'})
    });
  }
  onSubmit(): void {}
  selectDate(event: Date): void
  {
    const today = new Date(),
          age = today.getFullYear() - event.getFullYear();
    this.form.controls['age'].setValue(age);
  }
}