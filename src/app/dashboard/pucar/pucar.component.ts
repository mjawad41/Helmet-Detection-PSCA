import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PucarService } from '../../services/pucar.service'
import { concatWith, interval } from 'rxjs';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver-es';
@Component({
  selector: 'app-pucar',
  templateUrl: './pucar.component.html',
  styleUrls: ['./pucar.component.css']
})
export class PucarComponent implements OnInit{
  @Input() dateFrom: any;
  @Input() dateTo: any;

  Total_Cases:any;
  CrimeAgainstProperty:any;
  CrimeAgainstPerson:any;
  Other:any;

  isLoading: boolean = true;

  pcowiseCaseTalkTimeData:any;
  

  constructor(private pucar_service: PucarService){}

ngOnInit(): void {
  this.PcoWiseCases()
  this.PcoWiseTalkTime()
  this.CasesCount()

  interval(60000)     
  .subscribe(() => {
    this.PcoWiseCases()
    this.PcoWiseTalkTime()
    this.CasesCount()
  });
}

CasesCount()
{
  // Set isLoading to true before making the API call
  this.isLoading = true;
  this.pucar_service.getCasesCount(this.dateFrom, this.dateTo)
  .subscribe({
    next: (value) => {
     
      this.Total_Cases=value[0].total
      this.CrimeAgainstProperty=value[0].crimeAgainstProperty
      this.CrimeAgainstPerson=value[0].crimeAgainstPerson
      this.Other=value[0].miscellaneous

      this.isLoading=false;


    },
    error: (err) => {
      console.log(err);
    },

  });
}


  PcoWiseCases()
  {
    this.pucar_service.getPcoWiseCases(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       // Calculate average of total_cases
       const totalCasesSum = value.reduce((sum: number, item: any) => sum + parseInt(item.numberOfCases), 0);
       const averageTotalCases = Math.floor(value.length > 0 ? totalCasesSum / value.length : 0);

       // Calculate average of Talk_Time
       const totalTalkTimeSum = value.reduce((sum: number, item: any) => sum + parseInt(item.talkTime), 0);
       const averageTotalTalkTime = Math.floor(value.length > 0 ? totalTalkTimeSum / value.length : 0);

       // Transform data for PCOWiseCasesChart
       const PcoWiseCasesData = value.map((item: any) => ({
        name: item.receiverAgentName,
        y: parseInt(item.numberOfCases),
        color: parseInt(item.numberOfCases) >= averageTotalCases ? 'green' : 'red' // Set color based on your logic
        
      }));


       // Transform data for Excel Export
       this.pcowiseCaseTalkTimeData = value.map((item: any) => ({
        name: item.receiverAgentName,
        department:'PUCAR',
        cases: parseInt(item.numberOfCases),
        caseStatus: parseInt(item.numberOfCases) >= averageTotalCases ? 'Above Average' : 'Below Average',
        talktime: parseInt(item.talkTime),
        talktimeStatus: parseInt(item.talkTime) >= averageTotalTalkTime ? 'Above Average' : 'Below Average',
      }));

        // Update chart options
        this.PcoWiseCasesChart = {
          
          series: [{
            type: 'column',
            name: 'Crimes',
            data: PcoWiseCasesData,
          }],
          title:{
            text:'Case Wise Stats '+ '(Average='+Math.floor(averageTotalCases)+')'
          }
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
    const headers: any[] = ['Name','Department','Cases','Status', 'Talk Time', 'Status'];
    data.push(headers);
  
    //Add Data Rows
    this.pcowiseCaseTalkTimeData.forEach((item: { name: string, department: string, cases: number, caseStatus: string, talktime:number, talktimeStatus:string }) => {
      const row: any[] = [item.name, item.department, item.cases, item.caseStatus, item.talktime, item.talktimeStatus];
      data.push(row);
    });
  
    // Convert data to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
  
    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Save the workbook as an Excel file
    const excelFileName = 'PUCAR_Report '+ this.dateFrom.split(' ')[0] +'.xlsx';
    XLSX.writeFile(wb, excelFileName);
  }

  PcoWiseTalkTime()
  {
    this.pucar_service.getPcoWiseCases(this.dateFrom, this.dateTo)
    .subscribe({
      next: (value) => {
       
       console.log("Talktime Wise Stats",value);

       // Calculate average of total_cases
       const totalCasesSum = value.reduce((sum: number, item: any) => sum + parseInt(item.talkTime), 0);
       const averageTotalCases = Math.floor(value.length > 0 ? totalCasesSum / value.length : 0);

       // Transform data for PCOWiseCasesChart
       const PcoWiseTalktimeData = value.map((item: any) => ({
        name: item.receiverAgentName,
        y: parseInt(item.talkTime),
        color: parseInt(item.talkTime) >= averageTotalCases ? 'green' : 'red' // Set color based on your logic
        
      }));

        // Update chart options
        this.PcoWiseTalkTimeChart = {
          
          series: [{
            type: 'column',
            name: 'Crimes',
            data: PcoWiseTalktimeData,
          }],
          title:{
            text:"Talk Time Wise Stats "+'(Average='+Math.floor(averageTotalCases)+')'
          }
        };
        

         
        this.updateFlag = true;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag: any;
  overallPucarChart: Highcharts.Options = {
    title: {
      text: 'Overall Call Stats'
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
        ['Consult Calls', 250, false], ['Case Generated', 350, false], ['Invalid Calls', 450, false], ['Dropped Calls', 550, false]
      ],
      showInLegend: false
    }]
  };

  // Case Nature Chart
  pucarCaseNatureChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Case Nature Wise Calls'
    },

    credits: {
      enabled: false
    },
    xAxis: {
      type: 'category',
      categories: ['Crime Against Person', 'Crime Against Property', 'Other Criminal Offence', 'Law & Order', 'Misc', 'Local & Special Laws', 'Traffic', 'Other Help'],
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
        text: 'Cases'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b>: ' + this.y;
      }
    },
    // plotOptions: {
    //   series: {
    //       colorByPoint: true,
    //   }
    // },
    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Cases',
      data: [176, 25, 33, 55, 150, 35, 60, 43],
      //[
      //['Crime Against Person', 176, false], ['Crime Against Property', 25, false], ['Other Criminal Offence', 33, false], ['Law & Order', 55, false], ['Misc', 150, false], ['Local & Special Laws', 35, false], ['Traffic', 25, false], ['Other Help', 31, false],
      //   [176, 25, 33, 55, 150, 35, 60, 43],
      //,
      colorByPoint: true,
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
  // Crime against person chart
  pucarCrimeAgainstPersonChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Crime Against Person'
    },
    credits: {
      enabled: false
    },
    // plotOptions: {
    //   series: {
    //       colorByPoint: true,
    //   }
    // },
    xAxis: {
      type: 'category',
      categories: ['Assault\/Hurt', 'Kiddnaping\/Abduction', 'Sexual Assault', 'Murder'],
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
        text: 'Crimes'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Cases: <b>{point.y}</b>'
    },
    series: [{
      colorByPoint: true,
      type: 'column',
      allowPointSelect: true,
      name: 'Cases',
      data: [76, 25, 33, 55],
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

  // Crime against Property Chart
  pucarCrimeAgainstPropertyChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Crime Against Property'
    },
    credits: {
      enabled: false
    },
    // plotOptions: {
    //   series: {
    //       colorByPoint: true,
    //   }
    // },
    xAxis: {
      type: 'category',
      categories: ['Theft', 'Vehicle Theft', 'Burglary', 'Robbery\/Snatching', 'Vehicle Snatching', 'Dacoity'],
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
        text: 'Crimes'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Cases: <b>{point.y}</b>'
    },
    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Cases',
      data: [176, 25, 33, 55, 15, 20],
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

  // Traffic Offences Chart
  trafficOffencesChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Taffic Offences'
    },
    credits: {
      enabled: false
    },
    // plotOptions: {
    //   series: {
    //       colorByPoint: true,
    //   }
    // },
    xAxis: {
      type: 'category',
      categories: ['Traffic Accidents', 'Traffic Complaints', 'Traffic Violations'],
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
        text: 'Cases'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Cases: <b>{point.y}</b>'
    },
    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Cases',
      data: [176, 25, 33],
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

  // PCO Wise Cases Chart
  PcoWiseCasesChart: Highcharts.Options = {
    chart: {
      type: 'column',
      
    },
    title: {
      text: 'Case Wise Stats'
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
        text: 'Cases'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Case: <b>{point.y}</b>'
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

   // PCO Wise Talktime Chart
   PcoWiseTalkTimeChart: Highcharts.Options = {
    chart: {
      type: 'column',
      
    },
    title: {
      text: 'Talk Time Wise Stats'
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
        text: 'Talk Time'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Talk Time: <b>{point.y}</b>'
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

  // SoS Chart
  pucarSoSChart: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'PUCAR SOS'
    },
    credits: {
      enabled: false
    },
    // plotOptions: {
    //   series: {
    //       colorByPoint: true,
    //   }
    // },
    xAxis: {
      type: 'category',
      categories: ['Dacoity', 'Female Kidnapping\/Abduction', 'Illegal detention of a Person', 'Fire Eruption'],
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
        text: 'Cases'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Total Cases: <b>{point.y}</b>'
    },
    series: [{
      type: 'column',
      allowPointSelect: true,
      name: 'Cases',
      data: [40, 25, 33, 13],
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
