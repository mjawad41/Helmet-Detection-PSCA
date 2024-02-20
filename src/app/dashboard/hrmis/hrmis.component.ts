import { Component ,Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts'
import {HrmisService} from '../../services/hrmis.service'
import { interval } from 'rxjs';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-hrmis',
  templateUrl: './hrmis.component.html',
  styleUrls: ['./hrmis.component.css']
})
export class HrmisComponent implements OnChanges{
  departmentViseStaffStat: any;
  designationtViseStaffStat: any;
  cameras:any;
  selectedLocationId = 0;
  testnumber:number=1;
  
  @Input() dateFrom:any;

  @Input() dateTo:any;

  
  constructor(private hrmis_service: HrmisService) 
  {  
  
  }
  disableSelect = new FormControl(false);

  
  ngOnInit() {
    // this.dateFrom = new Date(new Date().getTime() + (-365 * 24 * 60 * 60 * 1000));;
    // this.searchResults();
    
    //this.getEntryExitCount();

    this.RoomWiseLeaveSummary()

    this.RoomWiseOffSummary()

    this.DepartmentWiseLeaveSummary()

    this.ShiftWiseStrengthSummary()
   
    //Reload dashboar stats after 1 Minute
    interval(60000)     
      .subscribe(() => {
        // this.searchResults();
        this.RoomWiseLeaveSummary()
        this.RoomWiseOffSummary()    
        this.DepartmentWiseLeaveSummary()
        this.ShiftWiseStrengthSummary()
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['dateFrom'] || changes['dateTo']) {

      // this.RoomWiseLeaveSummary()

      // this.RoomWiseOffSummary()
  
      // this.DepartmentWiseLeaveSummary()
  
      // this.ShiftWiseStrengthSummary()

    }

  }
  
  
  RoomWiseLeaveSummary()
  {
    this.hrmis_service.getRoomWiseLeaveSummary(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
       // console.log(value);

        // Transform data for departmentWiseAttendanceChart
        const LeaveSummaryData = value.map((item: any) => ({
          name: item.name,
          y: item.totalRecords,
          color: this.getRandomColor(),
        }));

        //console.log(BarchartData)

        // Update chart options
        this.RoomWiseLeaveSummaryChart = {
          
          series: [{
            type: 'column',
            name: 'Employees',
            data: LeaveSummaryData,
          }]
        };

         
        this.updateFlag = true;

        //console.log(this.departmentWiseAttendanceChart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  RoomWiseOffSummary()
  {
    this.hrmis_service.getRoomWiseOffSummary(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
        // console.log("RoomWise Off Summary")
        
         // Transform data for departmentWiseAttendanceChart
         const OffSummaryData = value
         .map((item: any) => [
          item.name,
          item.totalRecords,
          false // Assuming 'selected' is always false in your case
        ]);

        this.RoomWiseOffSummaryChart = {
          
          series: [{
            type: 'column',
            name: 'Employees',
            data: OffSummaryData,
          }]
        };
        
        
        this.updateFlag = true;

        //console.log(this.departmentWiseAttendanceChart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  DepartmentWiseLeaveSummary()
  {
    this.hrmis_service.getDepartmentWiseLeaveSummary(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
          // Transform data for departmentWiseAttendanceChart
         const DepartmentWiseLeaveSummaryData = value
         //.filter((item: any) => item.totalRecords <= 1) //we can use filters 
         .map((item: any) => [
          item.name,
          item.totalRecords,
          false // Assuming 'selected' is always false in your case
        ]);

        this.DepartmentWiseLeaveSummaryChart={
          series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data:DepartmentWiseLeaveSummaryData,
           
          }]
        };
        
        this.updateFlag = true;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ShiftWiseStrengthSummary()
  {
    this.hrmis_service.getShiftWiseStrengthSummary(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
        // console.log("RoomWise Off Summary")
       
         // Transform data for departmentWiseAttendanceChart
         const StrengthSummaryData = value
         .map((item: any) => [
          item.name,
          item.totalRecords,
          false // Assuming 'selected' is always false in your case
        ]);

        this.ShiftWiseStrengthSummaryChart = {
          
          series: [{
            type: 'column',
            name: 'Employees',
            data: StrengthSummaryData,
          }]
        };
        
        
        this.updateFlag = true;

        //console.log(this.departmentWiseAttendanceChart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
 
  
  // transformDataForChart(data: any): { name: string; y: number; color: string }[] {
  //   return data.map((item: any) => ({
  //     name: item.name,
  //     y: item.totalRecords,
  //     color: this.getRandomColor(),
  //   }));
  // }

  // Function to generate a random color in hexadecimal format
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  searchResults() {
    const request: any = {
      //DateFrom: this.dateFrom.toLocaleDateString(),
      //Dateto: this.dateTo.toLocaleDateString()
       
    };
    this.loadDepartmentViseStaffStat();
    this.loadCameras();
    //this.loadDesignationtViseStaffStat(request);
  }

 
  loadDepartmentViseStaffStat()
  {
    this.hrmis_service.getDepartmentViseStaffStat().subscribe(result => {
      this.departmentViseStaffStat = result;
    });
  }
  loadCameras()
  {
    this.hrmis_service.getCameras().subscribe(result => {
      this.cameras = result;
    });
  }
  loadDesignationtViseStaffStat(request:any)
  {
    this.hrmis_service.getDesignationtViseStaffStat(request).subscribe(result => {
      this.departmentViseStaffStat = result;
    });
  }
  locationChanged()
  {
    this.testnumber++
  }


  // Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag: any;
 //Department Wise Leave Summary Chart
  DepartmentWiseLeaveSummaryChart: Highcharts.Options = {
    title: {
      text: 'Department Wise Leave Summary'
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'pie',
      allowPointSelect: true,
      keys: ['name', 'y', 'selected', 'sliced'],
      data: [
      ],
      showInLegend: false
    }]
  };
 
   //Room Wise Off Summary Chart
  RoomWiseOffSummaryChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Room Wise Off Summary'
    },

    credits: {
      enabled: false
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Employees'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Employees: <b>{point.y}</b>'
    },

    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Employees',
      data: [],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y}', // one decimal 
        y: 2, // 10 pixels down from the top
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana, arial'
        }
      },
      showInLegend: true
    }]
  };

  //Room Wise Leave Summary Chart
  RoomWiseLeaveSummaryChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Room Wise Leave Summary'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Employees'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Employees: <b>{point.y}</b>'
    },
    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Employees',
      data: [],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y}', // one decimal 
        y: 2, // 10 pixels down from the top
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana, arial'
        }
      },
      showInLegend: true
    }]
  }

   //Shift Wise Strength Summary Chart
   ShiftWiseStrengthSummaryChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Shift Wise Strength Summary'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Employees'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Employees: <b>{point.y}</b>'
    },
    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Employees',
      data: [],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y}', // one decimal 
        y: 2, // 10 pixels down from the top
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana, arial'
        }
      },
      showInLegend: true
    }]
  }
}

