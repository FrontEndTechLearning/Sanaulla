import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

import { CustomToastService } from '../../services/custom-toast.service';

export interface loggedInUserDetails {
  email: string;
  id: number;
  name: string;
  password: string;
  phone: string
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  isLoading: boolean = false;
  hasError: boolean =false;
  
  loggedInUserDetails: loggedInUserDetails = {
    email: '',
    id: 0,
    name: '',
    password: '',
    phone: ''
  }

  public loginForm!: FormGroup

  constructor(private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authServices: AuthenticationService,
    private toasterService: CustomToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }

  login() {
    this.isLoading = true

    try {

      const response = this.authServices.onLoginOfUser(this.loginForm.value).subscribe((res) => {
        const { email, password } = this.loginForm.value;
        res.map((eachUser: any) => {
          if (eachUser.email === email) {
            this.isUserLoggedIn = true;
            this.loggedInUserDetails = eachUser

            localStorage.setItem('userName', this.loggedInUserDetails.email);
            localStorage.setItem('password', this.loggedInUserDetails.password);
            
            this.router.navigate(['/home'])
            this.toasterService.showSuccess('Successfully Loggedin', 'JSW.com');
          }
          //  else {
          //   console.log('came')
          //   this.toasterService.showError('unable to add new hero', 'JSW.com');
          // }
        })
        
      })

    } catch {

      this.toasterService.showError('Error While Registring a New User', 'JSW.com');
      this.isLoading = false

    }
  }


}
