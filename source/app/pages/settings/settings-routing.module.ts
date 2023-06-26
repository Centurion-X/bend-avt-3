import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes =
[{
  component: SettingsComponent,
  path: 'settings'
}];

@NgModule
({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class SettingsRoutingModule {}