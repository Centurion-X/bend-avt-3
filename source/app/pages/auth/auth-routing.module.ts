// import from Angular framework
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import from application files
import { AuthComponent } from "./auth.component";

const routes: Routes =
[{
  component: AuthComponent,
  path: ''
}];

@NgModule
({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class AuthRoutingModule {}