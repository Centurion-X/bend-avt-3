// import from Angular framework
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import from application files
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