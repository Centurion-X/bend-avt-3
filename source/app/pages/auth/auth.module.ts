import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { InputTextModule} from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

import { AuthComponent } from './auth.component'
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule
({
  declarations:
  [
    AuthComponent,
    AuthorizationComponent,
    RegistrationComponent
  ],
  imports:
  [
    CommonModule,
    AuthRoutingModule,
    CheckboxModule,
    FormsModule,
    InputTextModule,
    TabViewModule,
    ToastModule
  ],
  providers: [MessageService]
})

export class AuthModule {}