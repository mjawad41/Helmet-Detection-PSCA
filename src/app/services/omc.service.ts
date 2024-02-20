import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OmcService {

  constructor(private helperservice: HelperService) {}

  private defaultUrl = Enums.commonURLs.omcApiUrl ;

  
  getPoliceStationWiseObservations(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'ps_observation',{params:queryParams})
  }

  getPcoWiseObservations(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'user_observation',{params:queryParams})
  }

  getCaseNatureWiseObservations(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'case_nature_wise',{params:queryParams})
  }

  getDivisionWiseObservations(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'division_wise',{params:queryParams})
  }

  getTotalObservations(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'valid_invalid_process_observations',{params:queryParams})
  }

  getCategoryWiseCount(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'valid_ps_traffic',{params:queryParams})
  }

  getTrafficWiseObservations(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'traffic_wise',{params:queryParams})
  }

  
  getHourlyWiseObservations(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'user_hourly_observations',{params:queryParams})
  }


}
