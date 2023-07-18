// import from Angular framework
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import from application files
import { MainComponent } from './main/main.component';
import { SettingsComponent } from '../settings/settings.component';
import { TicketsComponent } from "./tickets.component";

const routes: Routes =
[{
    children:
    [{
        component: MainComponent,
        path: 'main'
      },
      {
        component: SettingsComponent,
        path: 'settings'
      },
      {
        loadChildren: () => import('../info/info.module').then(m => m.InfoModule),
        path: 'tour'
    }],
    component: TicketsComponent,
    path: ''
}];

@NgModule
({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class TicketsRoutingModule {}