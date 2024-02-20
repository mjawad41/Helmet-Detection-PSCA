import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { VerifyChallanComponent } from './verify-challan/verify-challan.component';
import { ChallanDashboardComponent } from './challan-dashboard/challan-dashboard.component';
import { VehiclePassingComponent } from './vehicle-passing/vehicle-passing.component';
import { DevicesComponent } from './devices/devices.component';
import { FaceverificationComponent } from './faceverification/faceverification.component';

const routes: Routes = [
 
  {
    path:'',
    component:BodyComponent
  },
  {
    path:'verify',
    component:VerifyChallanComponent
  },
  {
    path: 'verify-challan/:{id}',
    component: VerifyChallanComponent,
  },
  {
    path: 'verify-component',
    component: VerifyChallanComponent, // Add the component you want to navigate to
  },
  {
    path: 'dashboard',
    component: ChallanDashboardComponent, // Add the component you want to navigate to
  },
  {
    path: 'vehicle-passing',
    component: VehiclePassingComponent, // Add the component you want to navigate to
  },
  {
    path: 'violation-verification',
    component: BodyComponent, // Add the component you want to navigate to
  },
  {
    path:'devices',
    component:DevicesComponent
  },
  {
    path:'face-verification',
    component:FaceverificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
