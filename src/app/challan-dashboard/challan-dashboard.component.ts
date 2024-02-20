import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Variablepie from "highcharts/modules/variable-pie";
import { DashboardService } from '../services/dashboard.service';

// initialize the module
Variablepie(Highcharts);

@Component({
  selector: 'app-challan-dashboard',
  templateUrl: './challan-dashboard.component.html',
  styleUrls: ['./challan-dashboard.component.css']
})
export class ChallanDashboardComponent implements OnInit {

    startDate: string = '';
    endDate: string = '';

    placeOfViolation: string[] = [];
    withHelmet: number[] = [];
    withoutHelmet: number[] = [];

    sitewiseLocation:string[]=[];
    sitewiseCount:number[]=[];

    Hours:string[]=[];
    HourlyWiseWithHelmet:number[]=[];
    HourlyWiseWithoutHelmet:number[]=[];



constructor(private datePipe: DatePipe, private dashboard_service: DashboardService){}

        ngOnInit(): void {
        // Set currentDateTime to the current date and time
        const currentDate = new Date();
    
        // Set the startDate to 20 days earlier       
        const twentyDaysAgo = new Date();
        twentyDaysAgo.setDate(currentDate.getDate() - 20);
        this.startDate = this.datePipe.transform(twentyDaysAgo, 'yyyy-MM-dd 00:00:00') || '';
        this.endDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm') || '';

        this.getLocationWisePassingStats()
        this.getLocationWiseChallanStats()
        this.getHourlyWisePassingStats()
        this.getHourlyWiseChallanStats()
        this.getPassingTypeWiseStats()
        }

        Search()
        {
            this.getLocationWisePassingStats()
            this.getLocationWiseChallanStats()
            this.getHourlyWisePassingStats()
            this.getHourlyWiseChallanStats()
            this.getPassingTypeWiseStats()
        }

        getPassingTypeWiseStats()
        {
            this.dashboard_service.getPassingTypeWiseStats(this.startDate, this.endDate)
            .subscribe({
            next: (value) => {
            
            const withHelmetCount= value.map((item:any)=>item.WithHelmet)[0];
            const withoutHelmetCount = value.map((item:any)=>item.WithoutHelmet)[0];
           

            this.categoryWisePassingPie = {
                series: [
                    {
                    type: 'variablepie',
                      minPointSize: 10,
                      innerSize: '20%',
                      zMin: 0,
                      name: 'Vehicles',
                      borderRadius: 5,
                      data: [
                      {
                          name: 'With Helmet',
                          y: withHelmetCount,
                          z: 92
                      }, 
                      {
                          name: 'Without Helmet',
                          y: withoutHelmetCount,
                          z: 119
                      }
                    ],
                      colors: [
                          '#023e8a',
                          '#48cae4',
                      ]
                  }
                ]        
              };
                       
            },
            error: (err) => {
                console.log(err);
            },
            });
        }

        getLocationWisePassingStats()
        {
            this.dashboard_service.getLocationWisePassingStats(this.startDate, this.endDate)
            .subscribe({
            next: (value) => {
            
            this.placeOfViolation= value.map((item:any) => item.PlaceOfViolation);
            this.withHelmet = value.map((item:any) => item.WithHelmet);
            this.withoutHelmet = value.map((item:any) => item.WithoutHelmet);

            this.siteAndCategoryWisePassing = {
                xAxis:{
               categories:this.placeOfViolation
                },
                series: [
                    {
                      name: 'With Helmet',
                      data: this.withHelmet,
                      type: 'column',
                      color: ''
                    }, 
                    {
                      name: 'Without Helmet',
                      data: this.withoutHelmet,
                      type: 'column',
                      color: ''
                    }
                  ]               
              };
                       
            },
            error: (err) => {
                console.log(err);
            },
            });
        }

        getLocationWiseChallanStats()
        {
            this.dashboard_service.getLocationWiseChallanStats(this.startDate, this.endDate)
            .subscribe({
            next: (value) => {
            
            this.sitewiseLocation= value.map((item:any) => item.PlaceOfViolation);
            this.sitewiseCount=value.map((item:any) => item.TotalCount)

            this.siteWiseChallan = {
                xAxis:{
               categories:this.sitewiseLocation
                },
                series: [
                  {
                    name: 'Challans',
                    data: this.sitewiseCount,
                    type: 'column',
                    
                  }
                  ]               
              };
                       
            },
            error: (err) => {
                console.log(err);
            },
            });
        }

        getHourlyWisePassingStats()
        {
            this.dashboard_service.getHourlyWisePassingStats(this.startDate, this.endDate)
            .subscribe({
            next: (value) => {
            
            this.Hours= value.map((item:any) => item.HourOfDay);
            this.HourlyWiseWithHelmet = value.map((item:any) => item.WithHelmet);
            this.HourlyWiseWithoutHelmet = value.map((item:any) => item.WithoutHelmet);

            this.categoryWiseHourlyPassing = {
                xAxis:{
               categories:this.Hours
                },
                series: [
                    {
                      name: 'With Helmet',
                      data: this.HourlyWiseWithHelmet,
                      type: 'column',
                      color: '#6d9f8d'
                  }, 
                  {
                      name: 'Without Helmet',
                      data: this.HourlyWiseWithoutHelmet,
                      type: 'column',
                      color: '#80cfb2'
                  }
                  ]            
              };
                       
            },
            error: (err) => {
                console.log(err);
            },
            });
        }

        getHourlyWiseChallanStats()
        {
            this.dashboard_service.getHourlyWiseChallanStats(this.startDate, this.endDate)
            .subscribe({
            next: (value) => {
            
            const HoursData= value.map((item:any) => item.HourOfDay);
            const totalCount = value.map((item:any) => item.TotalCount);
           

            this.categoryWiseHourlyChallan = {
                xAxis:{
               categories:HoursData
                },
                series: [
                    {
                        name: 'Challan',
                        data: totalCount,
                        type: 'column',
                        color: '#845ec2'
                  }, 

                  ]            
              };
                       
            },
            error: (err) => {
                console.log(err);
            },
            });
        }


    // Highcharts
    Highcharts: typeof Highcharts = Highcharts;
    

    // Category Wise Passing Pie Chart
    categoryWisePassingPie: Highcharts.Options = {
      chart: {
          type: 'variablepie',
      },
      title: {
        text: 'Category Wise Passing'
      },
      subtitle: {
          text: ''
      },
      credits: {
          enabled: false
      },
      tooltip: {
          headerFormat: '',
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}: {point.y}</b><br/>' 
      },
      series: [{
        type: 'variablepie',
          minPointSize: 10,
          innerSize: '20%',
          zMin: 0,
          name: 'Vehicles',
          borderRadius: 5,
          data: [
          {
              name: 'With Helmet',
              y: 505992,
              z: 92
          }, {
              name: 'Without Helmet',
              y: 551695,
              z: 119
          }
        ],
          colors: [
              '#023e8a',
              '#48cae4',
          ]
      }]
    };

    // Site & Category Wise Passing Bar Chart
    siteAndCategoryWisePassing: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Site & Category Wise With Without Helmet'
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
            },
            // categories: ['Lahore',
            //         'Sheikhupura',
            //         'Nankana Sahib',
            //         'Kasur',
            //         'Gujranwala',
            //         'Sialkot',
            //         'Hafizabad',
            //         'Narowal',
            //         'M.B Din',
            //         'Gujrat',
            //         'Rawalpindi',
            //         'Jhelum',
            //         'Attock',
            //         'Chakwal',
            //         'Murree',
            //         'Talagang',
            //         'Faisalabad',
            //         'Jhang',
            //         'T.T Singh',
            //         'Chiniot',
            //         'Sargodha',
            //         'Khushab',
            //         'Mianwali',
            //         'Bhakkar',
            //         'Multan',
            //         'Vehari',
            //         'Khanewal',
            //         'Lodhran',
            //         'Sahiwal',
            //         'Okara',
            //         'Pakpattan',
            //         'Bahawalpur',
            //         'Bahawalnagar',
            //         'Rahim Yar Khan',
            //         'DG Khan',
            //         'Rajanpur',
            //         'Layyah',
            //         'Muzaffargarh',
            //         'Kot Adduu'
            //     ]
            categories: ['Lahore',
                    'Sheikhupura',
                ]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true,
                  style: {
                    textOutline: ''
                      //fontSize: '16px'
                  }
              }
          }
        },
        series: [
          {
            name: 'With Helmet',
            // data: [3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13],
            data: [3, 5],
            type: 'column',
            color: ''
        }, {
            name: 'Without Helmet',
            // data: [3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13],
            data: [3, 5],
            type: 'column',
            color: ''
        }
        ]
    };

    // Site Wise Challans Bar Chart
    siteWiseChallan: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Site Wise Challans'
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
            },
            categories: ['Lahore',
                    'Sheikhupura',
                    'Nankana Sahib',
                    'Kasur',
                    'Gujranwala',
                    'Sialkot',
                    'Hafizabad',
                    'Narowal',
                    'M.B Din',
                    'Gujrat',
                    'Rawalpindi',
                    'Jhelum',
                    'Attock',
                    'Chakwal',
                    'Murree',
                    'Talagang',
                    'Faisalabad',
                    'Jhang',
                    'T.T Singh',
                    'Chiniot',
                    'Sargodha',
                    'Khushab',
                    'Mianwali',
                    'Bhakkar',
                    'Multan',
                    'Vehari',
                    'Khanewal',
                    'Lodhran',
                    'Sahiwal',
                    'Okara',
                    'Pakpattan',
                    'Bahawalpur',
                    'Bahawalnagar',
                    'Rahim Yar Khan',
                    'DG Khan',
                    'Rajanpur',
                    'Layyah',
                    'Muzaffargarh',
                    'Kot Adduu'
                ]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true,
                  style: {
                    textOutline: ''
                      //fontSize: '16px'
                  }
              }
          }
        },
        series: [
          {
            name: 'Challans',
            data: [3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13],
            type: 'column',
            color: '#ff6384'
        }
        ]
    };

      // Category Wise Hourly Passing Bar Chart
      categoryWiseHourlyPassing: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Category Wise Hourly Passing'
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
            },
            categories: [
                    '00',
                    '01',
                    '02',
                    '03',
                    '04',
                    '05',
                    '06',
                    '07',
                    '08',
                    '09',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23',
                ]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true,
                  style: {
                    textOutline: ''
                      //fontSize: '16px'
                  }
              }
          }
        },
        series: [
          {
            name: 'With Helmet',
            data: [3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5],
            type: 'column',
            color: '#6d9f8d'
        }, 
        {
            name: 'Without Helmet',
            data: [3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5],
            type: 'column',
            color: '#80cfb2'
        }
        ]
    };

      // Category Wise Hourly Challan Bar Chart
      categoryWiseHourlyChallan: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Hourly Wise Challan'
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
            },
            categories: [
                    '00',
                    '01',
                    '02',
                    '03',
                    '04',
                    '05',
                    '06',
                    '07',
                    '08',
                    '09',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23',
                ]
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true,
                  style: {
                    textOutline: ''
                      //fontSize: '16px'
                  }
              }
          }
        },
        series: [
          {
            name: 'Challan',
            data: [3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5, 1, 13, 3, 3, 5, 1, 13, 3, 5],
            type: 'column',
            color: '#845ec2'
        }
        ]
    };
}
