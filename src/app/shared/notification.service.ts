import { Injectable } from '@angular/core';
import * as Enums from './enum.service';
//import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  addToast(_title: string, _body: string, _messagetype?: Enums.messageType, _timeout?: number) {
    let toastTime = 3000;
    if (_timeout != null) {
      toastTime = _timeout;
    }
  
    let toastObj = {
      severity: 'success',
      summary: _title,
      detail: _body,
      life: toastTime,
      sticky: false
    };
    switch (_messagetype) {
      case Enums.messageType.default: toastObj.severity = 'success'; break;
      case Enums.messageType.Info: toastObj.severity = 'info'; break;
      case Enums.messageType.Success: toastObj.severity = 'success'; break;
      case Enums.messageType.Wait: toastObj.severity = ''; break;
      case Enums.messageType.Error: toastObj.severity = 'error'; break;
      case Enums.messageType.Warning: toastObj.severity = 'warn'; break;
      default: toastObj.severity = 'success'; break;
    }    
    //this.messageService.add(toastObj);
  }
}
