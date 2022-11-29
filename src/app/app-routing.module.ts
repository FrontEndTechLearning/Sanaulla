import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupUpPageComponent } from './components/signup-up-page/signup-up-page.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginPageComponent},
  {path:"signUp", component:SignupUpPageComponent},
  {path:"home", component:CrudComponent},
  {path: 'crud' ,  component: CrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
