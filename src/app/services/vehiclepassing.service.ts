import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclePassingService {

  private defaultUrl = 'http://10.22.16.119:215/api/VehiclePassing/GetVehiclePassing';
  private exciseUrl = 'http://10.20.101.192:3000/api/GetVehicleDataByPlateNo?PlateNo=';

  private addUrl = 'http://10.22.16.119:215/api/Challan/Add';

  private addFacialUrl = 'http://10.22.16.119:215/api/Challan/AddFacialChallan';
  
  private InvalidUrl = 'http://10.22.16.119:215/api/VehiclePassing/PassingStatus';



 
  constructor(private helperservice: HelperService, private httpClient: HttpClient) { 
  }
  
  getServerSideVehiclePassingData(StartDate: string, EndDate: string, PlaceOfViolationCode: number, PassingType: number,PageNumber: any,PageSize:number, sSearch:string, DeviceCode:number): Observable<any> {
  
    let queryParams = new HttpParams()
      .append("Startdate", StartDate)
      .append("Enddate", EndDate)
      .append("PlaceOfViolationCode", PlaceOfViolationCode.toString())
      .append("PassingType", PassingType.toString())
      .append("PageSize", PageSize) // Corrected here
      .append("PageNumber", PageNumber.toString())
      .append("sSearch", sSearch)
      .append("DeviceCode", DeviceCode);

  
    return this.helperservice.getWithParams(this.defaultUrl, { params: queryParams });
  }

  getVehiclePassingData(StartDate:string,EndDate:string,PlaceOfViolationCode:number, PassingType:number): Observable<any>
  {
    let queryParams =
    new HttpParams();
     queryParams = queryParams.append("Startdate",StartDate);
     queryParams = queryParams.append("Enddate",EndDate);
     queryParams = queryParams.append("PlaceOfViolationCode",PlaceOfViolationCode);
     queryParams = queryParams.append("PassingType",PassingType);
    return this.helperservice.getWithParams(this.defaultUrl,{params:queryParams})
  }

  getLocationList(): Observable<any>
  {
    return this.helperservice.getWithParams('http://10.22.16.119:215/api/Common/GetSite',{})
  }

  getCameraList(locationId:number): Observable<any>
  {
    return this.helperservice.getWithParams('http://10.22.16.119:215/api/Common/GetDeviceBySiteCode?SiteCode='+locationId)
  }

 
  getExciseData(PlateNo:string): Observable<any> {
    console.log(PlateNo)
    return this.helperservice.get(this.exciseUrl+PlateNo);
  }

  AddChallan(data:any): Observable<any>
  {    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.addUrl, data, { headers });
  }

  AddFaceChallan(data:any): Observable<any>
  {    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.addFacialUrl, data, { headers });
  }

  InvalidChallan(vehiclePassingID: any, status: any): Observable<any> {
    console.log(vehiclePassingID);
    console.log(status);

    // Build parameters
    const params = new HttpParams()
      .set('vehiclePassingID', vehiclePassingID)
      .set('status', status);

    // Construct the full URL
    const fullUrl = `${this.InvalidUrl}?${params.toString()}`;

    // Set content type to application/x-www-form-urlencoded
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    // Make the POST request
    return this.httpClient.post(fullUrl, null, { headers });
  }

  CloneChallan(vehiclePassingID: any, status: any): Observable<any> {
    console.log(vehiclePassingID);
    console.log(status);

    // Build parameters
    const params = new HttpParams()
      .set('vehiclePassingID', vehiclePassingID)
      .set('status', status);

    // Construct the full URL
    const fullUrl = `${this.InvalidUrl}?${params.toString()}`;

    // Set content type to application/x-www-form-urlencoded
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    // Make the POST request
    return this.httpClient.post(fullUrl, null, { headers });
  }

  getFacialData():Observable<any>
  {
  return this.httpClient.get('https://7b9b3c54-cc3e-40b3-bfef-9d4e596d9c42.mock.pstmn.io/api/Challan/GetMatchingPersons');
  }
}


