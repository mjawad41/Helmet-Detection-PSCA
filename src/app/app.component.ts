import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'psca_dashboard';
  showBody = true; // Add this variable

  // Add a method to toggle the visibility of <app-body>
  toggleBodyVisibility() {
    this.showBody = !this.showBody;
  }
}
