import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }
}
export enum commonURLs {
  api = 'http://localhost:64747/api/',   
  baseAppUrl = 'http://10.20.101.213:1112/api/',
  eccApiUrl = 'http://10.20.101.213:1112/api/',
  edcApiUrl='https://edc.psca.gop.pk/',
  pucarApiUrl = 'http://10.22.212.142:777',
  //omcApiUrl = 'http://10.20.101.213:1112/api/',
  etcApiUrl = 'http://10.22.212.142:777/api',
  vmcApiUrl = 'http://10.20.101.213:1112/api/',
  hrmisApiUrlp = 'http://10.20.11.171/',
  omcApiUrl='http://dboard.psca.gop.pk/ppic3',
  hrmisApiUrl='http://10.22.212.142:777/api'
}
export enum echallan {
  // ExciseApi = 'http://10.20.101.220:880/api/GetVehicleDataByPlateNo?PlateNo='
  ExciseApi = 'http://localhost:3000/api/' 
}
export enum messageType {
  Success = 1,
  Error = 2,
  Warning = 3,
  Info = 4,
  Wait = 5,
  default = 6
}