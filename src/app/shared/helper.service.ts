import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { ConfirmationService } from 'primeng/api';
import {AuthService} from './auth.service'
import {NotificationService} from './notification.service'
import * as Enums from './enum.service';
 

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private notifyservice: NotificationService,
    //private confirmationService: ConfirmationService,
    private http: HttpClient,
    private authService: AuthService
  ) {
  }
  
  get(url: string): Observable<any> {
    return this.http.get<Response>(url).pipe(catchError(error => {
      return this.handleError(of(error.error));
    }));
  }

  getWithParams(url: string, Options?:any): Observable<any> {
    return this.http.get<Response>(url, Options).pipe(catchError(error => {
      return this.handleError(of(error.error));
    }));
  }

  post(url: string, body:any): Observable<any> {
    return this.http.post<Response>(url, body).pipe(catchError(error => {
      return this.handleError(of(error.error));
    }));
  }

  delete(url: string): Observable<any> {
    return this.http.delete<Response>(url).pipe(catchError(error => {
      return this.handleError(of(error.error));
    }));
  }
  private handleError(error: Response | any) {
    // debugger;
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.value;
    }
    var friendlyErrorMsg = '';
    if (errMsg == "you are not supposed to access this!...") {
      friendlyErrorMsg = 'You are not permitted to do this!';
      this.notify('Permission Required', friendlyErrorMsg, Enums.messageType.Info);
    }
    else {
      friendlyErrorMsg = 'Something bad happened; please try again later.';
      this.notify('Error', friendlyErrorMsg, Enums.messageType.Error);
    }

    return throwError(errMsg);
  }
  notify(_title: string, _body: string, _messagetype?: Enums.messageType, _timeout?: number) {
    this.notifyservice.addToast(_title, _body, _messagetype, _timeout);
  }
}
