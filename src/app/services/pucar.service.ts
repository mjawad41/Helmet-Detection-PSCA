import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PucarService {
 
  private defaultUrl = Enums.commonURLs.pucarApiUrl ;
  constructor(private helperservice: HelperService) { 
  }
  
  getPcoWiseCases(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
     queryParams = queryParams.append("OperationId",1);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'api/PUCAR/Stats',{params:queryParams})
  }

  getCasesCount(StartDate:string,EndDate:string): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("startdate",StartDate);
     queryParams = queryParams.append("enddate",EndDate);
     queryParams = queryParams.append("OperationId",2);
  
    return this.helperservice.getWithParams(this.defaultUrl+'/'+'api/PUCAR/Count',{params:queryParams})
  }
}
