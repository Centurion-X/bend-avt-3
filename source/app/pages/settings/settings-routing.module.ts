// import from Angular framework
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import from application files
import { SettingsComponent } from './settings.component';

const routes: Routes =
[{
  component: SettingsComponent,
  path: ''
}];

@NgModule
({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class SettingsRoutingModule {}