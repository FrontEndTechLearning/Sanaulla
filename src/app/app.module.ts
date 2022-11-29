import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrudComponent } from './components/crud/crud.component';
import { ToastrModule } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { EmpoyeeOperationService } from './services/empoyee-operation.service';
import { BwmImageUploadComponent } from './bwm-image-upload/bwm-image-upload.component';
import { SignupUpPageComponent } from './components/signup-up-page/signup-up-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { CustomInterceptor } from './interceptors/custom.interceptor';
import { CustomNavbarComponent } from './custom-navbar/custom-navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    BwmImageUploadComponent,
    SignupUpPageComponent,
    LoginPageComponent,
    HomeComponent,
    CustomNavbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({    timeOut: 10000,    positionClass: 'toast-top-center',    preventDuplicates: true,  }),
    FormsModule
  ],
  providers: [ NgForm, EmpoyeeOperationService, {
    provide : HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent,]
})
export class AppModule { }
