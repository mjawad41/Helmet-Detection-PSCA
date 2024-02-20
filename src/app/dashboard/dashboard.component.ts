import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OmcComponent } from './omc/omc.component';
import { HrmisComponent } from './hrmis/hrmis.component';
import { PucarComponent } from './pucar/pucar.component';
import { EtcComponent } from './etc/etc.component';
import { EdacComponent } from './edac/edac.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})
export class DashboardComponent implements OnInit{
  @ViewChild('childOmcComponent') childOmcComponent!: OmcComponent;
  @ViewChild('childhrmisComponent') childhrmisComponent!: HrmisComponent;
  @ViewChild('childpucarComponent') childpucarComponent!: PucarComponent;
  @ViewChild('childetcComponent') childetcComponent!: EtcComponent;
  @ViewChild('childedcComponent') childedcComponent!: EdacComponent;

  constructor(private datePipe: DatePipe){}
  
  startDate: string='' ;
  endDate: string = '';

//code for shift
  shifts: string[] = ['Shift A', 'Shift B', 'Shift C'];
  selectedShift: string = 'Shift A';

name:string='parent value'

ngOnInit(): void {
  this.startDate= this.datePipe.transform(new Date(), 'yyyy-MM-dd 06:00:00')!;
  this.endDate= this.datePipe.transform(new Date(), 'yyyy-MM-dd 14:00:00')!; //HH:mm:ss
}

// updateDate(): void {
//   // Logic to handle the date update based on the selected shift
//   if (this.selectedShift === 'Shift A') {
//     this.startDate = this.getFormattedDate(new Date()); // Set to the current date
//     this.endDate = this.getFormattedDate(this.addHours(new Date(), 8)); // 6 AM to 2 PM
//   } else if (this.selectedShift === 'Shift B') {
//     this.startDate = this.getFormattedDate(this.addHours(new Date(), 14)); // 2 PM
//     this.endDate = this.getFormattedDate(this.addHours(new Date(), 22)); // to 10 PM
//   } else if (this.selectedShift === 'Shift C') {
//     this.startDate = this.getFormattedDate(this.addHours(new Date(), 22)); // 10 PM
//     this.endDate = this.getFormattedDate(this.addHours(new Date(), 30)); // to 6 AM (next day)
//   }

// }

// private getFormattedDate(date: Date): string {
//   return date.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:mm'
// }

// private addHours(date: Date, hours: number): Date {
//   return new Date(date.getTime() + hours * 60 * 60 * 1000);
// }

 updateDatesForShift() {
  const currentDate = new Date(this.startDate);

  switch (this.selectedShift) {
    case 'Shift A':
      this.startDate = this.formatDate(currentDate, 6, 0); // Set to the current date and 6 AM
      this.endDate = this.formatDate(currentDate, 14, 0); // 2 PM
      break;

    case 'Shift B':
      this.startDate = this.formatDate(currentDate, 14, 0); // 2 PM
      this.endDate = this.formatDate(currentDate, 22, 0); // 10 PM
      break;

    case 'Shift C':
      this.startDate = this.formatDate(currentDate, 22, 0); // 10 PM
      this.endDate = this.formatDate(this.addDays(currentDate, 1), 6, 0); // 6 AM (next day)
      break;

    default:
      // Default case, set to the current date and 6 AM
      this.startDate = this.formatDate(currentDate, 6, 0);
      this.endDate = this.formatDate(currentDate, 14, 0);
      break;
  }
}

private formatDate(date: Date, hours: number, minutes: number): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return `${formattedDate}T${formattedTime}`;
}

private addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


private addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

onUpdateDateClick()
{
  // this.startDate;
  // this.endDate;
 // Check if the date range is valid
 if (this.isDateRangeValid()) {
  //calling omc child methods
  this.childOmcComponent.TotalObservations()
  this.childOmcComponent.CategoryWiseObservations()
  this.childOmcComponent.DivisionWiseObservations();
  this.childOmcComponent.CaseNatureWiseObservations()
  this.childOmcComponent.PoliceStationWiseObservations()
  this.childOmcComponent.PcoWiseObservations()
  this.childOmcComponent.DivisionWiseObservations()
  this.childOmcComponent.TrafficWiseObservations()
  this.childOmcComponent.HourlyWiseObservations()

//calling Hrms child methods
  this.childhrmisComponent.RoomWiseLeaveSummary()
  this.childhrmisComponent.RoomWiseOffSummary()
  this.childhrmisComponent.DepartmentWiseLeaveSummary()
  this.childhrmisComponent.ShiftWiseStrengthSummary()

//calling Pucar methods
this.childpucarComponent.PcoWiseCases()
this.childpucarComponent.PcoWiseTalkTime()
this.childpucarComponent.CasesCount()

//calling ETC methods
this.childetcComponent.PcoWiseEchallan()
this.childetcComponent.EchallanCount()

//calling EDC methods
this.childedcComponent.EdcRequests()
this.childedcComponent.districtWiseEDCCases()
this.childedcComponent.PcoWiseRequests()
 }
}



isDateRangeValid(): boolean {
  // Convert string dates to Date objects for comparison
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);

  // Check if endDate is greater than or equal to startDate
  return endDate >= startDate;
}

}
