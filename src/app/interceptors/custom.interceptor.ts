import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpoyeeOperationService } from '../services/empoyee-operation.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private employeeOperationService: EmpoyeeOperationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>): any {
    const token = this.employeeOperationService.getAuthToken();
    
    return request.clone({
      setHeaders: {
        Authorization: `basic ${token}`
      }
    })
  }
}
