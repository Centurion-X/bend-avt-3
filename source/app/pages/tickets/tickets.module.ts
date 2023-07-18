// import from Angular framework
import { CalendarModule } from 'primeng/calendar';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import from PrimeNG library
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
// import from application files
import { AsideComponent } from './aside/aside.component';
import { BorderDirective } from '../../directives/border.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InputTextModule } from 'primeng/inputtext';
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
    CalendarModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    MenubarModule,
    TicketsRoutingModule,
    ToastModule
  ],
  providers: [DatePipe, MessageService]
})

export class TicketsModule {}