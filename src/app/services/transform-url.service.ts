import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformURLService {

  constructor(private http: HttpClient) { }

  getTransformedImage(url:string):Observable<Blob> {
    return this.http.get(url,{responseType: 'blob'})

  }
}
