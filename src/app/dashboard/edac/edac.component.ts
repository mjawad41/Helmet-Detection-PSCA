import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import { EdacService } from '../../services/edac.service'
import { interval } from 'rxjs';
@Component({
  selector: 'app-edac',
  templateUrl: './edac.component.html',
  styleUrls: ['./edac.component.css']
})
export class EdacComponent implements OnInit{
  @Input() dateFrom: any;
  @Input() dateTo: any;

  Total_Requests:any;
  Pending_Requests:any;
 Approved_Requests:any;
  Data_Delivered:any;
  Average:any;

  constructor(private edac_service: EdacService ){}

  ngOnInit(): void {
      this.EdcRequests()
      this.districtWiseEDCCases()
      this.PcoWiseRequests()

      interval(60000)     
      .subscribe(() => {
      this.EdcRequests()
      this.districtWiseEDCCases()  
      this.PcoWiseRequests()
      });
  }

  EdcRequests()
  {
    this.edac_service.getEdcRequests(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
        this.Total_Requests = value[0].total_requests;
        this.Pending_Requests = value[0].pending_requests;
        this.Approved_Requests = value[0].approved_requests;
        this.Data_Delivered = value[0].data_delivered;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  PcoWiseRequests()
  {
    this.edac_service.getPcoWiseRequests(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
       console.log(value);

       // Calculate average of total_observations
       const totalRequestsSum = value.reduce((sum: number, item: any) => sum + parseInt(item.total_requests), 0);
       const averageTotalRequests = Math.floor(value.length > 0 ? totalRequestsSum / value.length : 0);
       this.Average=averageTotalRequests;
       // Transform data for departmentWiseAttendanceChart
       const PcoWiseRequestsData = value.map((item: any) => ({
        name: item.name,
        y: parseInt(item.total_requests),
        color: parseInt(item.total_requests) >= averageTotalRequests ? 'green' : 'red' // Set color based on your logic
        // , events: {
        //   mouseOver: (event: any) => {

        //     console.log('Mouseover event:', event);
        //   }
        // }
      }));

        // Update chart options
        this.PcoWiseRequestsChart = {
          title: {
            text: 'PCO Wise Requests ' + '(Average=' + Math.floor(this.Average)+')'
          },
          series: [{
            type: 'column',
            name: 'Crimes',
            data: PcoWiseRequestsData,
          }],
          
        };
        

         
        this.updateFlag = true;

        //console.log(this.departmentWiseAttendanceChart);
      },
      error: (err) => {
        console.log(err);
      },
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

  districtWiseEDCCases()
  {
    this.edac_service.getdistrictWiseEDCCases(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
             
        const districtWiseEDCCasesData = value.map((item: any) => ({
          name: item.disname,
          y: parseInt(item.total_district_requests),
          color: this.getRandomColor(),
         
        }));

        // Update chart options
        this.districtWiseEDCCasesChart = {
          
          series: [{
            type: 'column',
            data: districtWiseEDCCasesData,
          }]
        };
        
        this.updateFlag = true;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

    updateFlag:any
    // Highcharts
    Highcharts: typeof Highcharts = Highcharts;
    // District Wise EDC Cases Chart
    districtWiseEDCCasesChart: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'District Wise EDC Stats'
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
                text: 'Number of Requests'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Total Evidence: <b>{point.y}</b>'
        },
        series: [{
            type: 'column',
            allowPointSelect: true,
            name: 'Evidence',
            data: [
                { name: 'Lahore', y: 12, color: '#3498db' },
                { name: 'Sialkot', y: 15, color: '#2ecc71' },
                { name: 'Rawalpindi', y: 33, color: '#e74c3c' },
                { name: 'Sheikhupura', y: 55, color: '#f39c12' },
                { name: 'Faisalabad', y: 20, color: '#9b59b6' },
                { name: 'Kasur', y: 35, color: '#1abc9c' },
                { name: 'Nankana', y: 25, color: '#e67e22' },
                { name: 'Gujranwala', y: 31, color: '#34495e' },
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

    // PCO Wise Requests Chart
  PcoWiseRequestsChart: Highcharts.Options = {
    chart: {
      type: 'column',
      
    },
    title: {
      text: 'PCO Wise Requests'
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
        text: 'Requests'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Requests: <b>{point.y}</b>'
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
