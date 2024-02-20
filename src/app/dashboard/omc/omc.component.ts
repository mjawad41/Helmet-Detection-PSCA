import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import { OmcService } from '../../services/omc.service'
import { interval } from 'rxjs';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver-es';




@Component({
  selector: 'app-omc',
  templateUrl: './omc.component.html',
  styleUrls: ['./omc.component.css']
})




export class OmcComponent implements OnInit{

  @Input() dateFrom: any;
  @Input() dateTo: any;
  DivisionWiseObservationsData:any;
  TotalObservationsData:any;

  Total:any
  Valid:any
  InValid:any
  InProcess:any
  Traffic:any
  Police:any
  Medical:any;
  Miscellaneous:any;
  Average:number=0;

  pcowiseObservationsData:any;


  constructor(private omc_service: OmcService){}

  ngOnInit(): void {
    this.HourlyWiseObservations()
    this.TotalObservations()
    this.CategoryWiseObservations()
    this.CaseNatureWiseObservations()
    this.PoliceStationWiseObservations()
    this.PcoWiseObservations()
    this.DivisionWiseObservations()
    this.TrafficWiseObservations()

    interval(60000)     
    .subscribe(() => {
    this.TotalObservations()
    this.CategoryWiseObservations()
    this.CaseNatureWiseObservations()
    this.PoliceStationWiseObservations()
    this.PcoWiseObservations()
    this.DivisionWiseObservations()
    this.TrafficWiseObservations()
    this.HourlyWiseObservations()
      
    });

  }

  // ngOnChanges(changes: SimpleChanges): void {
    
  //   if (changes['dateFrom'] || changes['dateTo']) {

  //     this.PoliceStationWiseObservations()
  //     this.PcoWiseObservations()
  //     this.CaseNatureWiseObservations()
  //     this.DivisionWiseObservations()
  //     this.TrafficWiseObservations()
  //   }

  // }
h0=[];
h1=[];
h2=[];
h3=[];
h4=[];
h5=[];
h6=[];
h7=[];

calculateAverage(data: number[]): number {
  const totalSum = data.reduce((sum, value) => sum + value, 0);
  const average = data.length > 0 ? totalSum / data.length : 0;
  return average;
}

onLegendItemClick(event: any): void {
//   const seriesName= event.target.name;
//  this.HourlyWiseObservationsChart={
//   title: {
//     text: 'PCO Wise Observations'
//   }
//  }
}

names: string[] = [
 
]
  HourlyWiseObservations()
  {
    
    this.omc_service.getHourlyWiseObservations(this.dateFrom, this.dateTo)
    .subscribe({
      next: (data) => {
       
        console.log("HourlyWise",data)

         // Reset hour arrays
         this.h0 = [];
         this.h1 = [];
         this.h2 = [];
         this.h3 = [];
         this.h4 = [];
         this.h5 = [];
         this.h6 = [];
         this.h7 = [];

        data.map((u: any, ui: any)=>{
          u.observation.map((o: any, oi: any)=>{
            //console.log(u.firstname, o.total_observations)

             // Determine the target array based on oi index
            let targetArray: any;
            if (oi === 0) {
              targetArray = this.h0;
            } 
            else if (oi === 1) {
              targetArray = this.h1;
            } else if (oi === 2) {
              targetArray = this.h2;
            } else if (oi === 3) {
              targetArray = this.h3;
            }else if (oi === 4) {
              targetArray = this.h4;
            }else if (oi === 5) {
              targetArray = this.h5;
            }else if (oi === 6) {
              targetArray = this.h6;
            }else if (oi === 7) {
              targetArray = this.h7;
            }

            // Push the total_observations into the target array
            if (targetArray) {
              targetArray.push(parseInt(o.total_observations));
            }
          });
        });


        console.log("HO",this.h0)
        console.log("H1",this.h1)
        console.log("H2",this.h2)

         // Calculate average for each hour
         const averageH0 = this.calculateAverage(this.h0);
         const averageH1 = this.calculateAverage(this.h1);
         const averageH2 = this.calculateAverage(this.h2);
         const averageH3 = this.calculateAverage(this.h3);
         const averageH4 = this.calculateAverage(this.h4);
         const averageH5 = this.calculateAverage(this.h5);
         const averageH6 = this.calculateAverage(this.h6);
         const averageH7 = this.calculateAverage(this.h7);

        const users: string[] = Array.from(new Set(data.map((item: any) => item.firstname)));
        //this.names = users;  // This should correctly assign the array of user names

        console.log("Users",users);

        // Extract unique hours
        const hours: string[] = Array.from(new Set(data.flatMap((item: any) => item.observation.map((obs: any) => obs.hour))));

        console.log("Hourse",hours)

        
           // Update chart options
           this.HourlyWiseObservationsChart = {          
            xAxis: {
              type: 'category',
              categories: users,
              labels: {
                rotation: -45,
                style: {
                  fontSize: '12px',
                  fontFamily: 'Verdana, sans-serif'
                }
              }
            },
            plotOptions: {
              series: {
                events: {
                  legendItemClick: (event) => this.onLegendItemClick(event)
                }
              }
            },
            series: 
            [
              {
              type: 'column',
              name: '1st Hour',
               data: this.h0.map((value) => ({
                y: value,
                color: value >= averageH0 ? 'green' : 'red',
              })),
              color: '#FF69B4',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             },
             {
              type: 'column',
              name: '2nd Hour',
              data: this.h1.map((value) => ({
                y: value,
                color: value >= averageH1 ? 'green' : 'red',
              })),
              color: '#800080',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             },
             {
              type: 'column',
              name: '3rd Hour',
              data: this.h2.map((value) => ({
                y: value,
                color: value >= averageH2 ? 'green' : 'red',
              })),
              color: '#FF0000',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             },

             {
              type: 'column',
              name: '4th Hour',
              data: this.h3.map((value) => ({
                y: value,
                color: value >= averageH3 ? 'green' : 'red',
              })),
              color: '#B22222',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             },
             
             {
              type: 'column',
              name: '5th Hour',
              data: this.h4.map((value) => ({
                y: value,
                color: value >= averageH4 ? 'green' : 'red',
              })),
              color: '#3303a9',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             },
             
             {
              type: 'column',
              name: '6th Hour',
              data: this.h5.map((value) => ({
                y: value,
                color: value >= averageH5 ? 'green' : 'red',
              })),
              color: '#189987',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             },
             
             {
              type: 'column',
              name: '7th Hour',
              data: this.h6.map((value) => ({
                y: value,
                color: value >= averageH6 ? 'green' : 'red',
              })),
              color: '#f9b405',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             },
             
             {
              type: 'column',
              name: '8th Hour',
              data: this.h7.map((value) => ({
                y: value,
                color: value >= averageH7 ? 'green' : 'red',
              })),
              color: '#07090f',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Display custom text if the value is zero
                  return this.y === 0 ? '0' : this.y;
                }
              }
             }
          ]
          };
         
        this.updateFlag = true;
    

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  

  TotalObservations()
  {
    this.omc_service.getTotalObservations(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
        this.Total = value[0].total;
        this.Valid = value[0].valid;
        //this.Traffic = value[0].traffic;
        //this.Police = value[0].police;
        this.InValid=value[0].invalid;
        this.InProcess=value[0].in_process;


      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  CategoryWiseObservations()
  {
    this.omc_service.getCategoryWiseCount(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
        
        this.Traffic = value[0].traffic;
        this.Police = value[0].police;
        this.Medical=value[0].medical_fire;
        this.Miscellaneous=value[0].miscellaneous;


      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  DivisionWiseObservations()
  {
    this.omc_service.getDivisionWiseObservations(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       // @ts-ignore
       this.DivisionWiseObservationsData=value.map(item => ({
        total_observations:item.total_observations,
        name: item.name.replace(/\bdivision\b/gi, '').trim()
      }));

       this.updateFlag = true;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  PoliceStationWiseObservations()
  {
    this.omc_service.getPoliceStationWiseObservations(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
       //console.log(value);
      
        const policeStationWiseObservationsData = value.map((item: any) => ({
          name: item.name,
          y: parseInt(item.total_observations),
          color: this.getRandomColor(),
         
        }));

        //console.log(BarchartData)

        // Update chart options
        this.policeStationWiseObservationsChart = {
          
          series: [{
            type: 'column',
            name: 'Crimes',
            data: policeStationWiseObservationsData,
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

  



  PcoWiseObservations()
  {
    this.omc_service.getPcoWiseObservations(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       this.pcowiseObservationsData=value;
       console.log("PCO_WISE_OBSERVATIONS",value);

       // Calculate average of total_observations
       const totalObservationsSum = value.reduce((sum: number, item: any) => sum + parseInt(item.total_observations), 0);
       const averageTotalObservations = Math.floor(value.length > 0 ? totalObservationsSum / value.length : 0);
       this.Average=averageTotalObservations;
       
       // Transform data for departmentWiseAttendanceChart
       const policeStationWiseObservationsData = value.map((item: any) => ({
        name: item.firstname,
        y: parseInt(item.total_observations),
        catWise: item.case_nature,

        color: parseInt(item.total_observations) >= averageTotalObservations ? 'green' : 'red' // Set color based on your logic
        , events: {
          mouseOver: (event: any) => {
              
          },
          mouseOut: (event: any) => {
             
          }
        },
        
      }));

       // Transform data for Excel Export
       this.pcowiseObservationsData = value.map((item: any) => ({
        name: item.firstname,
        department:'OMC',
        observations: parseInt(item.total_observations),
        rank: parseInt(item.total_observations) >= averageTotalObservations ? 'Above Average' : 'Below Average'
      }));

      const CategoryWiseObservations = [
        [
          { category: 'One Way Violation', count: 10 },
          { category: 'Broken No Plate', count: 15 }
        ],
        [
          { category: 'One Way Violation', count: 20 },
          { category: 'Broken No Plate', count: 25 }
        ]
        
      ];

      const caseNatureArrays = value.map((item:any) => item.case_nature);

      //console.log("vjefguey",caseNatureArrays);

        // Update chart options
        this.PcoWiseObservationsChart = {
          title: {
            text: 'PCO Wise Observations ' + '(Average=' + Math.floor(this.Average)+')'
          },
          tooltip: {
            useHTML: true,
            formatter: function () {
              let subCats = policeStationWiseObservationsData[this.point.index].catWise;
              let toolTip = `<b>Name:</b> ${policeStationWiseObservationsData[this.point.index].name}<br/>`;
              toolTip += `<b>Total Observations:</b> ${this.y}<br/>`;
              subCats.map((item: any)=>{
                toolTip += `<b>${item.name}:</b>${item.total_observations}<br/>`
              });

              return toolTip;
            },
            
          },
          series: [{
            type: 'column',
            name: 'Crimes',
            data: policeStationWiseObservationsData,
          }],
          
        };
        

         
        this.updateFlag = true;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  exportToExcel() {
    const data: any[][] = [];
  
    // Add headers
    const headers: any[] = ['Name','Department','Total Observations','Status'];
    data.push(headers);
  


    this.pcowiseObservationsData.forEach((item: { name: string, department: string, observations: number, rank: string }) => {
      const row: any[] = [item.name, item.department, item.observations, item.rank];
      data.push(row);
    });
  
    // Convert data to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

   
    
    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    

  
    // Save the workbook as an Excel file
    const excelFileName = 'PCO_Observations Report '+this.dateFrom.split(' ')[0]+'.xlsx';
    XLSX.writeFile(wb, excelFileName);
  }
  

  CaseNatureWiseObservations()
  {
    this.omc_service.getCaseNatureWiseObservations(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {

          // Transform data for departmentWiseAttendanceChart
         const CaseNatureWiseObservationsData = value
         //.filter((item: any) => item.totalRecords <= 1) //we can use filters 
         .map((item: any) => [
          item.name,
          parseInt(item.total_observations),
          false // Assuming 'selected' is always false in your case
        ]);

        this.CaseNatureWiseObservationsChart={
          series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data:CaseNatureWiseObservationsData,
           
          }]
        };
       // console.log(PiechartData)
        
        this.updateFlag = true;

        //console.log(this.departmentWiseAttendanceChart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  TrafficWiseObservations()
  {
    this.omc_service.getTrafficWiseObservations(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
       console.log("Traffic Wise Observations",value);

       // Transform data for departmentWiseAttendanceChart
        const trafficWiseObservationsData = value.map((item: any) => [
          item.name,
          // parseInt(item['COUNT(*)']), // Assuming 'Total Observations' is a string, convert it to a number
          parseInt(item['total_observations']),
          false // Assuming 'selected' is always false in your case
        ]);

        // Update chart options
        this.TrafficWiseObservationsChart = {
          
          series: [{
            type: 'column',
            name: 'Traffic',
            data: trafficWiseObservationsData,
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
  

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag: any;
  // Category Wise Observations Chart
  CaseNatureWiseObservationsChart: Highcharts.Options = {
    title: {
      text: 'OMC Observations'
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
      data: [ ],
      showInLegend: false
    }]
  };

  // Traffic Bar Chart
  TrafficWiseObservationsChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Traffic Observations'
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
        text: 'OMC Traffic Observations'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Crimes: <b>{point.y}</b>'
    },

    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Traffic',
      data: [],
      color: '#e55353',
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

  // Police Station Bar Chart
  policeStationWiseObservationsChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Police Station Wise Observations'
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
        text: 'Observations'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Crimes: <b>{point.y}</b>'
    },

    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Crimes',
      data: [ ],
      color: '#e55353',
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

  // PCO Wise Chart
  PcoWiseObservationsChart: Highcharts.Options = {
    chart: {
      type: 'column',
      
    },
    title: {
      text: 'PCO Wise Observations'
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
        text: 'Observations'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Observations: <b>{point.y}</b>'
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

  HourlyWiseObservationsChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    
    title: {
      text: 'Hourly Observations'
    },
    subtitle: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'category',
      categories: [],
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
        text: 'Total Observations'
      }
    },
    legend: {
      enabled: true,
      align: 'center',
      layout: 'horizontal',
    },
    tooltip: {
      pointFormat: 'Total Observations: <b>{point.y}</b>'
    },
    series: [
      // Hour-1
      {
        type: 'column',
        
        data: [
         
      ], // Replace with your actual data
       
      },
      //Hour-2
      {
        type: 'column',
        
        data: [
         
      ], // Replace with your actual data
        
      },
      // // Hour-3
      {
        type: 'column',
        
        data: [], // Replace with your actual data
        
      },
      // // Hour-4
      {
        type: 'column',
        
        data: [], // Replace with your actual data
        
       },
      // // Hour-5
      {
        type: 'column',
        
        data: [], // Replace with your actual data
        
      },
      // // Hour-6
      {
        type: 'column',
        
        data: [], // Replace with your actual data
        
      },
      // // Hour-7
      {
        type: 'column',
        
        data: [], // Replace with your actual data
        
      },
      // // Hour-8
      {
        type: 'column',
        
        data: [], // Replace with your actual data
        
      }
      // Add more series as needed
    ]
  };

}