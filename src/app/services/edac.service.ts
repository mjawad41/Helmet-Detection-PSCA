import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EdacService {
  private defaultUrl = Enums.commonURLs.edcApiUrl ;
  constructor(private helperservice: HelperService) {}

 
  
  
  getdistrictWiseEDCCases(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'ed/api_districtwise_stats',{params:queryParams})
  }

  getEdcRequests(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'ed/api_pending_approved_stats',{params:queryParams})
  }

  getPcoWiseRequests(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'ed/user_wise_requests_stats',{params:queryParams})
  }


}
