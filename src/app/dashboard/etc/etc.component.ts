import { Component ,Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import {EtcService} from '../../services/etc.service'
import { interval } from 'rxjs';

@Component({
  selector: 'app-etc',
  templateUrl: './etc.component.html',
  styleUrls: ['./etc.component.css']
})
export class EtcComponent implements OnInit {
  @Input() selectedValues: any;
  @Input() dateFrom: any;
  @Input() dateTo: any;

  CarCount:any;
  MotorcycleCount:any;
  OtherCount:any;
  TotalCount:any;
  Average:number=0;

  isLoading: boolean = true;

constructor(private etc_service:EtcService){}

ngOnInit(): void {
  this.PcoWiseEchallan()
  this.EchallanCount()

  interval(60000)     
  .subscribe(() => {
    this.PcoWiseEchallan()
    this.EchallanCount()
  });
}

getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

EchallanCount()
{
  this.etc_service.getEchallanCount(this.dateFrom,this.dateTo)
  .subscribe({
    next:(value)=> {
      this.CarCount=value[0].car
      this.MotorcycleCount=value[0].motorCycle
      this.OtherCount=value[0].others
      this.TotalCount=value[0].total
    },
    error:(err)=> {
      
    },
  })
}

  PcoWiseEchallan()
  {
     // Set isLoading to true before making the API call
    this.isLoading = true;

    this.etc_service.getPcoWiseEchallan(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {

         // Calculate average of total_cases
       const totalCasesSum = value.reduce((sum: number, item: any) => sum + parseInt(item.totalRecords), 0);
       const averageTotalCases = Math.floor(value.length > 0 ? totalCasesSum / value.length : 0);
       this.Average=averageTotalCases
       
       // Transform data for PcoWiseEchallanChart
        const PcoWiseEchallanData = value.map((item: any) => ({
        name: item.name,
        y: parseInt(item.totalRecords),
        color: parseInt(item.totalRecords) >= averageTotalCases ? 'green' : 'red' // Set color based on your logic
        
      }));

        // Update chart options
        this.PcoWiseEchallanChart = {
          series: [{
            type: 'column',
            name: 'Observations',
            data: PcoWiseEchallanData,
          }],
          title:{
            text:"PCO Wise E-Challan "+'(Average='+Math.floor(this.Average)+')'
          }
        };
        

         
        this.updateFlag = true;
        // Set isLoading to false when the API call is complete
        this.isLoading = false;

      },
      error: (err) => {
        //console.log(err);
      },
      
    });
  }

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag:any;
  // category wise chart
  vehicleWiseChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Vehicle Wise Violations'
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
        text: 'Violations'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Violations: <b>{point.y}</b>'
    },
    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Evidence',
      data: [
        { name: 'Motorcycle', y: 176, color: '#3498db' },
        { name: 'Commercial', y: 55, color: '#f39c12' },
        { name: 'Car', y: 150, color: '#9b59b6' },
      ],
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

  // Violation Wise Chart
  categoryWiseViolationsChart: Highcharts.Options = {
    title: {
      text: 'Category Wise Violations'
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
        ['One Way Violation', 250, false], ['Red Light Violation', 350, false], ['Overspeed', 450, false], ['Smoke Emitting', 550, false]
      ],
      showInLegend: false
    }]
  };

  // Bank Wise Chart
  bankWiseChart: Highcharts.Options = {
    title: {
      text: 'Bank Wise E-Challan Payment'
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
        ['NBP', 250, false], ['BOP', 350, false], ['E-Pay', 450, false]
      ],
      showInLegend: false
    }]
  };

    // PCO Wise Echallans
    PcoWiseEchallanChart: Highcharts.Options = {
      chart: {
        type: 'column',
        
      },
      title: {
        text: 'PCO Wise E-Challan'
      },
      
      subtitle: {
        text: ''
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
          text: 'E-Challan'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Total E-Challan: <b>{point.y}</b>'
      },
  
      series: [{
        type: 'column',
        allowPointSelect: true,
        name: 'Observations',
        data: [ ],
        color: '#2eb85c',
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
}
