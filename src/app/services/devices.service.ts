import { Injectable } from '@angular/core';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private defaultUrl = 'http://10.22.16.119:215/api/Common/GetDevices';
  
  constructor(private helperservice: HelperService, private httpClient: HttpClient) { 
  }
  
  getDevicesData(): Observable<any> {   
    return this.helperservice.getWithParams(this.defaultUrl);
  }

  
}


