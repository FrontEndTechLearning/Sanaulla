import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';

import { CustomToastService } from '../../services/custom-toast.service';



@Component({
  selector: 'app-signup-up-page',
  templateUrl: './signup-up-page.component.html',
  styleUrls: ['./signup-up-page.component.scss']
})
export class SignupUpPageComponent implements OnInit {
  public signUpForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
      private authService : AuthenticationService,
      private toasterService :CustomToastService ) { }


  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:["", Validators.required],
      email: ["",Validators.required],
      phone:["",Validators.required],
      password: ["",Validators.required]
    })
  }

 
  onSignUp(){
    try{
    let tempObj = this.signUpForm.value;
    tempObj.id = Math.random();
    
   const response =  this.authService.signUp(tempObj).subscribe( (res)=>{
    
    this.toasterService.showSuccess('New User Has Been Registred Successfully','JSW.com');
    this.router.navigate(['/login'])
   })
  } catch{
    this.toasterService.showError('Error While Registring a New User','JSW.com')
  }
    
  }

}
