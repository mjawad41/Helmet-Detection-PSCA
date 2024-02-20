import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-asm',
  templateUrl: './asm.component.html',
  styleUrls: ['./asm.component.css']
})
export class AsmComponent {

  // Highcharts
    Highcharts: typeof Highcharts = Highcharts;

    // Category Wise Requested Items Pie Chart
    categoryWiseRequestedItemsChart: Highcharts.Options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Item Wise Requests',
        },
        subtitle: {
            text: '',
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            // headerFormat: '<b>{point.key}: {point.percentage:.1f}%</b>',
            //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            // pointFormat: null
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    // format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: 10, // use -50 to move inside
                    // filter: {
                    //     property: 'percentage',
                    //     operator: '>',
                    //     value: 4
                    // },
                    style: {
                        fontSize: '16px'
                        //color: 'white'
                    }
                }
                // dataLabels: {
                //     enabled: true,
                //     format: '{point.name}'
                // }
            }
        },
        series: [{
            type: 'pie',
            name: '',
            data: [
                ['Jacket', 5120],
                ['Trouser', 3204],
                ['Neck Shirt', 2015],
                ['Polo Shirt', 1502],
                ['Belt', 4372],
                ['Batches', 3271],
                ['Ring Binding Note Book', 2031],
                ['System', 7086],
                ['LCD', 2109],
                ['Keyboard', 6501],
                ['Mouse', 4305],
                ['Head Phone', 2149]

            ]
        }],
        colors: ['#53C2B2', '#79ABDF', '#C45B7A', '#ED5B4F', '#7DE385', '#2467A0', '#F3C276', '#3AC2BD', '#ea5771', '#f98f5d', '#133a57', '#75687c']
    };

    // requests Status Chart
    requestsStatusChart: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Requests Status Chart'
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
            name: 'Crimes',
            data: [
                ['Total', 500, false], ['Approve', 300, false], ['Pending', 150, false], ['Rejected', 50, false],],
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
