// import from Angular framework
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import from PrimeNG library
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
// import from application files
import { InfoRoutingModule } from './info-routing.module';
import { TicketComponent } from './ticket/ticket.component';

@NgModule
({
  declarations: [TicketComponent],
  imports:
  [
    CalendarModule,
    CarouselModule,
    CommonModule,
    FormsModule,
    InfoRoutingModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule
  ]
})

export class InfoModule {}