import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private defaultUrl = 'http://10.22.16.119:215/api/Dashboard/Stats';


  constructor(private helperservice: HelperService, private httpClient: HttpClient) { 
  }

  getPassingTypeWiseStats(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
 
     queryParams = queryParams.append("OperationId",3);
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
    return this.helperservice.getWithParams(this.defaultUrl,{params:queryParams})
  }
  
  getLocationWisePassingStats(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
 
     queryParams = queryParams.append("OperationId",1);
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
    return this.helperservice.getWithParams(this.defaultUrl,{params:queryParams})
  }

  
  getLocationWiseChallanStats(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
 
     queryParams = queryParams.append("OperationId",2);
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
    return this.helperservice.getWithParams(this.defaultUrl,{params:queryParams})
  }

  getHourlyWisePassingStats(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
 
     queryParams = queryParams.append("OperationId",4);
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
    return this.helperservice.getWithParams(this.defaultUrl,{params:queryParams})
  }

  getHourlyWiseChallanStats(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
 
     queryParams = queryParams.append("OperationId",5);
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
    return this.helperservice.getWithParams(this.defaultUrl,{params:queryParams})
  }

 
}


