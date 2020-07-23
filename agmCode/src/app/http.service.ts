import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}
  getReq(url: string, params?: any): Observable<any> {
    return this.http
      .get(url, { params: params })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    return of({ ...err.error, isError: true });
  }
}
