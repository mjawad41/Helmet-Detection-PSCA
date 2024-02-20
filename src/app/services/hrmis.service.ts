import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HrmisService {

  constructor(private helperservice: HelperService, private http: HttpClient) {}
  
  private defaultUrl = Enums.commonURLs.hrmisApiUrl ;
  private defaultUrlp = Enums.commonURLs.hrmisApiUrlp ;

  getDepartmentViseStaffStat(): Observable<any> {
    return this.helperservice.get(this.defaultUrl + 'Locations/' );
  }

  getDesignationtViseStaffStat(request:any): Observable<any> {
    return this.helperservice.post(this.defaultUrl+ '/',request);
  }

  getCameras():Observable<any>{
    return this.helperservice.get(this.defaultUrl+'cameras/')
  }

  getDepartmentWiseLeaveSummary(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("OperationId",1);
     queryParams = queryParams.append("StartDate",StartDate);
     queryParams = queryParams.append("EndDate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'HRMS/Stats',{params:queryParams})
  }

  getRoomWiseLeaveSummary(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("OperationId",2);
     queryParams = queryParams.append("StartDate",StartDate);
     queryParams = queryParams.append("EndDate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'HRMS/Stats',{params:queryParams})
  }

  getRoomWiseOffSummary(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("OperationId",3);
     queryParams = queryParams.append("StartDate",StartDate);
     queryParams = queryParams.append("EndDate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'HRMS/Stats',{params:queryParams})
  }

  getShiftWiseStrengthSummary(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("OperationId",4);
     queryParams = queryParams.append("StartDate",StartDate);
     queryParams = queryParams.append("EndDate",EndDate);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'HRMS/Stats',{params:queryParams})
  }
 



}
