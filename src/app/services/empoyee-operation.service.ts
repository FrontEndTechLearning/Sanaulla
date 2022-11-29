import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, map, retry, subscribeOn } from 'rxjs/operators';

import { CustomToastService } from './custom-toast.service';


export interface Employee {
  id: number;
  name: string;
  email: string;
  gender:string;
  image: string;
  locations: any;
}

@Injectable({
  providedIn: 'root'
})


export class EmpoyeeOperationService {

  constructor(
    private http: HttpClient,
    private toasterService: CustomToastService,
    ) {

  }

    url = 'http://localhost:3000/employees';

    httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    

   //this function is to get employees list
    getEmployeesByFetching() : Observable<Employee[]> {
      return this.http.get<Employee[]>(this.url).pipe(map((res:any)=>{
        return res;
      }))
    }

    //used to post employee detatails
    addEmplyees(employee: Employee) : Observable<Employee> {
      const headers = {'content-type' :  'application/json'};
      const body = JSON.stringify(employee);

      return this.http.post<Employee>(this.url, body, this.httpHeader).pipe(
        retry(1),
        catchError(this.httpError)
      )
   }
   

   onEmployeeDelate(id: any) {
    return this.http.delete<any>(this.url+"/"+ id, this.httpHeader)
    .pipe(retry(1),
    catchError(this.httpError)
    )
   };

 
   httpError(error: any) {
    console.log('error is:', error)
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
      this.toasterService.showError('Coneection Error','JWS.com')
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.toasterService.showError('Coneection Error','JWS.com')
    }
    console.log(msg);
    return throwError(msg);
  }
  
  onEmployeeUpdate(id: number,employeeDetails: Employee) : Observable<any> {
    
    return this.http.put<any>(`http://localhost:3000/employees/${id}` + id,JSON.stringify(employeeDetails),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  getAuthToken(): string {
    return '1234567890'
  }
   
}
