// import from Angular framework
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
// import from PrimeNG library
import { InputTextModule} from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
// import from application files
import { LoaderComponent } from './loader/loader.component';
import { PasswordComponent } from './password/password.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { StatisticComponent } from './statistic/statistic.component';

@NgModule
({
  declarations:
  [
    LoaderComponent,
    PasswordComponent,
    SettingsComponent,
    StatisticComponent
  ],
  imports:
  [
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    TableModule,
    TabViewModule,
    ToastModule
  ],
  providers: [MessageService]
})

export class SettingsModule {}