import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';

import { AsideComponent } from './aside/aside.component';
import { BorderDirective } from '../../directives/border.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TicketsComponent } from './tickets.component';
import { TicketsRoutingModule } from './tickets-routing.module';

@NgModule
({
  declarations:
  [
    AsideComponent,
    BorderDirective,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    TicketsComponent
  ],
  imports:
  [
    CommonModule,
    DropdownModule,
    FormsModule,
    MenubarModule,
    TicketsRoutingModule
  ]
})

export class TicketsModule {}