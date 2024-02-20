import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HrmisService } from '../../services/hrmis.service'
import { interval } from 'rxjs';
@Component({
    selector: 'app-vms',
    templateUrl: './vms.component.html',
    styleUrls: ['./vms.component.css']
})
export class VmsComponent {
    @Input() dateFrom: any;
    @Input() dateTo: any;

    // Highcharts
    Highcharts: typeof Highcharts = Highcharts;

    //vistors chart
    vistorsChart: Highcharts.Options = {
        title: {
            text: ''
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
                ['IO Evidence', 250, false], ['Guests', 350, false], ['Vehicles', 450, false],
            ],
            showInLegend: false
        }]
    };
}
