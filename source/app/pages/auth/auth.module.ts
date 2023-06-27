// import from Angular framework
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
// import from PrimeNG library
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule} from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
// import from application files
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
    AuthRoutingModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    TabViewModule,
    ToastModule
  ],
  providers: [MessageService]
})

export class AuthModule {}