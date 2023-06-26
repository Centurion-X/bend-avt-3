import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicketComponent } from './ticket/ticket.component';

const routes: Routes =
[{
  component: TicketComponent,
  path: ''
}];

@NgModule
({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class InfoRoutingModule {}