import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {VerifyService} from '../../echallanServices/verify.service'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  vehicleDetails:any
  plateNumber:any
  
  constructor(private verify_service: VerifyService,private fb: FormBuilder) 
  {  
  
  }
 
  
  
  ngOnInit() {
    // // this.dateFrom = new Date(new Date().getTime() + (-365 * 24 * 60 * 60 * 1000));;
    // this.getVehicleDetails();
    // //this.getEntryExitCount();
   
  
    // //Reload dashboar stats after 1 Minute
    // interval(60000)     
    //   .subscribe(() => {
    //     this.getVehicleDetails();
    //   });
  }
  getVehicleDetails(plateNumber:any)
  {
    this.verify_service.getVehicleDetails(plateNumber)
    .subscribe(result => {
      this.vehicleDetails = result;
    });
  }
}
