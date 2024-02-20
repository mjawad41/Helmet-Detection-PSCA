import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import{AuthService} from './shared/auth.service'
import {EnumService} from './shared/enum.service'
import {NotificationService} from './shared/notification.service'
import {HelperService} from './shared/helper.service';
import { HrmisComponent } from './dashboard/hrmis/hrmis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EtcComponent } from './dashboard/etc/etc.component';
import { OmcComponent } from './dashboard/omc/omc.component';
import { EdacComponent } from './dashboard/edac/edac.component';
import { PucarComponent } from './dashboard/pucar/pucar.component';
import { VmsComponent } from './dashboard/vms/vms.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component'
import { HighchartsChartModule } from 'highcharts-angular';
import { AsmComponent } from './dashboard/asm/asm.component';
import { ProcurementComponent } from './dashboard/procurement/procurement.component';
import { BodycontentComponent } from './bodycontent/bodycontent.component';
import { VerifyComponent } from './echallan/verify/verify.component';
import { LoaderComponent } from './dashboard/loader/loader.component';
import { BodyComponent } from './body/body.component';
import { UnverifiedchallanlistComponent } from './unverifiedchallanlist/unverifiedchallanlist.component';
import {DataTablesModule} from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerifyChallanComponent } from './verify-challan/verify-challan.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChallanDashboardComponent } from './challan-dashboard/challan-dashboard.component';
import { VehiclePassingComponent } from './vehicle-passing/vehicle-passing.component';
import { DevicesComponent } from './devices/devices.component';
import { FaceverificationComponent } from './faceverification/faceverification.component';




@NgModule({
  
  declarations: [
    AppComponent,
    HrmisComponent,
    DashboardComponent,
    EtcComponent,
    OmcComponent,
    EdacComponent,
    PucarComponent,
    VmsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    AsmComponent,
    ProcurementComponent,
    BodycontentComponent,
    VerifyComponent,
    LoaderComponent,
    BodyComponent,
    UnverifiedchallanlistComponent,
    VerifyChallanComponent,
    ChallanDashboardComponent,
    VehiclePassingComponent,
    DevicesComponent,
    FaceverificationComponent,
    
  ],
  imports: [ 
     
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule,
    DataTablesModule,
    FormsModule,
    NgxImageZoomModule,
    ToastrModule.forRoot(),
    NgbModule, // ToastrModule added

  ],
  providers: [AuthService,EnumService,NotificationService,HelperService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
