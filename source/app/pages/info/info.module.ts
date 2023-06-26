import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfoRoutingModule } from './info-routing.module';
import { TicketComponent } from './ticket/ticket.component';

@NgModule
({
  declarations: [TicketComponent],
  imports:
  [
    CommonModule,
    InfoRoutingModule
  ]
})

export class InfoModule {}