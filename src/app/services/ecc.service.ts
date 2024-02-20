import { Injectable } from '@angular/core';
import * as Enums from '../shared/enum.service';
import {HelperService} from '../shared/helper.service'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EccService {

  constructor(private helperservice: HelperService) {}
}
