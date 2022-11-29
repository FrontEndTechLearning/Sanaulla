import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { CustomToastService } from './custom-toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 

  constructor(private http: HttpClient , private toaster: CustomToastService ) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  signUp(signUpDetails: any) : Observable<any>{
    
      const body = JSON.stringify(signUpDetails);
  return  this.http.post<any>("http://localhost:3000/signupUsersList",body, this.httpHeader).pipe(
    retry(1),
    catchError(this.httpError)
  )
  }

  onLoginOfUser(loginDetails: any) : Observable<any> {
const body = JSON.stringify(loginDetails)

return this.http.get<any>("http://localhost:3000/signupUsersList").pipe(
  retry(1),
  catchError((e:any)=>this.httpError(e))
)
  }

  httpError(error: any) {
    let msg = error.statusText;
    return throwError(msg);
  }
}
