import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  
  constructor(private helperservice: HelperService) {}
  
  private ExciseApiUrl = Enums.echallan.ExciseApi ;

  getVehicleDetails(PlateNo:string): Observable<any> {
    debugger;
    return this.helperservice.get(this.ExciseApiUrl +'GetVehicleDataByPlateNo?PlateNo='+ PlateNo);
  }
}
