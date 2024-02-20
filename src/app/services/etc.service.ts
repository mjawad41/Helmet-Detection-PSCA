import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtcService {

  private defaultUrl = Enums.commonURLs.etcApiUrl ;
  constructor(private helperservice: HelperService) { 
  }
  
  getPcoWiseEchallan(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
     queryParams = queryParams.append("OperationId",1);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'Echallan/Stats',{params:queryParams})
  }

  getEchallanCount(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
     queryParams = queryParams.append("OperationId",2);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'Echallan/Count',{params:queryParams})
  }
}
