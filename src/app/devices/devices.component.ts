import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceService } from '../services/devices.service';

declare var $: any; // Import jQuery



@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit, AfterViewInit, OnDestroy{
  dtOptions: DataTables.Settings = {};


  deviceList:[]=[];

  constructor(private device_service:DeviceService){}
  ngOnInit(): void {
    
    this.getDeviceList()
    this.initializeDataTables()
  }

  ngAfterViewInit(): void {
    // Initialize DataTables after the view is initialized
    this.initializeDataTables();
  }

  ngOnDestroy(): void {
    // Destroy DataTables when the component is destroyed to prevent memory leaks
    $('.dataTable').DataTable().destroy();
  }


  getDeviceList()
  {
   this.device_service.getDevicesData().subscribe({

  next: (value:any) => {
  this.deviceList=value
  console.log(this.deviceList)

  // Reload DataTables with new data
  const dataTable = $('.dataTable').DataTable();
  dataTable.clear().rows.add(this.deviceList).draw();

  },
  error:(err:any)=> {
    
  },
    
})
  }

  private initializeDataTables(): void {
    if (!$.fn.DataTable.isDataTable('.dataTable')) {
      $('.dataTable').DataTable({
        "columnDefs": [
          // { "width": "5%", "targets": 0 },
          // { "width": "20%", "targets": 1 }
        ],
        data: this.deviceList,
        columns: [
          { title: 'Camera Name', data: 'CameraName' },
          { title: 'Type', data: 'SiteTypeName' },
          { title: 'Division', data: 'DisivionName' },
          { title: 'Road', data: 'RoadName' },
          { title: 'Lane', data: 'LaneNumber' },
          { title: 'Status', data: 'DeviceLiveStatus' },
        
        ],
        "order": [ 0, 'asc' ],
      });

    }
  }


}
