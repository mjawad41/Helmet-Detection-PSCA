
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VehiclePassingService } from '../services/vehiclepassing.service';
import { Router } from '@angular/router';

declare var $: any; // Import jQuery

@Component({
  selector: 'app-vehicle-passing',
  templateUrl: './vehicle-passing.component.html',
  styleUrls: ['./vehicle-passing.component.css']
})
export class VehiclePassingComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  startDate: string = '';
  endDate: string = '';
  locationId:number=0;
  PassingTypeId:number=1;

  VehicleChallanData: any=0;

  isLoading: boolean = false;

  locationList:any[]=[];
  


  constructor(
    private echallan_service: VehiclePassingService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.VehicleChallanData)
    // Set currentDateTime to the current date and time
    const currentDate = new Date();
    this.startDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd 00:00:00') || '';
    this.endDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm') || '';
    //Populating the 
    this.LocationList()

    this.initializeDataTables();


  }


  ngOnDestroy(): void {
    // Destroy DataTables when the component is destroyed to prevent memory leaks
    $('.dataTable').DataTable().destroy();
  }

  LocationList()
  {
    this.echallan_service.getLocationList()
    .subscribe({
      next: (value: any) => {
        console.log("Location List",value);
        this.locationList=value       
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  Search() {

    console.log(this.startDate)
    console.log(this.endDate)
    console.log("LocationID,",this.locationId)
    this.isLoading = true;
    this.echallan_service.getServerSideVehiclePassingData(this.startDate, this.endDate, this.locationId, this.PassingTypeId,1,10,"",0)
      .subscribe({
        next: (value: any) => {
          console.log('Vehicle Challan Data inside Body', value);
          this.VehicleChallanData = value;

          // Reload DataTables with new data
          const dataTable = $('.dataTable').DataTable();
          dataTable.clear().rows.add(this.VehicleChallanData).draw();

          this.isLoading = false;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  private initializeDataTables(): void {
    this.dtOptions = {
      serverSide: true,
      lengthMenu: [10, 25, 50, 100], // Set the available page sizes
      ajax: (dataTablesParameters: any, callback: any) => {
        this.echallan_service.getServerSideVehiclePassingData(
          this.startDate,
          this.endDate,
          this.locationId,
          this.PassingTypeId,
          dataTablesParameters.start / dataTablesParameters.length + 1,
          dataTablesParameters.length, 
          dataTablesParameters.search.value,
          0 //this is the cameraId for all
        ).subscribe({
          next: (value: any) => {
            this.VehicleChallanData = value.data;
            callback({
              recordsTotal: value.totalRecords,
              // recordsFiltered: value.recordsFiltered,
              recordsFiltered: value.totalRecords,
              data: this.VehicleChallanData,
              
            });
            this.isLoading = false;
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      columns: [
        { title: 'ID', data: 'vehiclePassingID' },
        { title: 'Camera', data: 'deviceName' },
        { title: 'Direction', data: 'drivingDirection' },
        { title: 'Place of Violation', data: 'placeOfViolation' },
        { title: 'Violation Time', data: 'passingDateTime' },
        {
          title: 'Photo',
          data: 'photopath',
          className: 'text-center',
          render: (data: any, type: any, row: any, meta: any) => {
            if (type === 'display') {
              return `
                <a href="javascript:void(0);" class="open-modal-btn"
                  data-indx="${meta.row}",
                  data-id="${row.vehiclePassingID}"
                  data-camera="${row.deviceName}"
                  data-direction="${row.drivingDirection}"
                  data-place="${row.placeOfViolation}"
                  data-time="${row.passingDateTime}"
                  data-image="${data}"
                  >
                  <svg class="img-icon" style="width: 34px; height: 20px;">
                    <use xlink:href="assets/vendors/coreui/icons/svg/free.svg#cil-wallpaper"></use>
                  </svg>
                </a>`;
            }
            return data;
          }
        }
      ],
      
    };
    $('table').on('click', '.open-modal-btn', (event:any) => {
      const target = event.currentTarget;
      const indx = $(target).data('indx');
      this.openModal(indx);
    });
  
  }


  updateDataTable(): void {
    const table: any = $('.dataTable').DataTable();
    table.clear().rows.add(this.VehicleChallanData).draw();
  }

  openModal(indx: number): void {
    // Open the modal and display the data
    const modal = document.getElementById('myModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');

    // Set data in the modal
    //const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    const violation = this.VehicleChallanData[indx]
    console.log(violation)

    if (modalBody) {
      //modalTitle.textContent = `Helo Modal Title - ID: ${id}, Camera: ${camera}, Direction: ${direction}`;
      let modalContent = `
      <div class="">
            <div class="row justify-content-center">
              <div class="col-12">
                <img src="${violation.photopath}" alt="" class="img-fluid">
              </div>
              <div class="col-12">
                <table class="table table-bordered mt-2">
                  <tbody>
                    <tr class="table-secondary">
                      <th>Camera</th>
                      <th>Direction</th>
                    </tr>
                    <tr>
                      <td id="indx" class="d-none">${indx}</td>
                      <td>${violation.deviceName}</td>
                      <td>${violation.drivingDirection}</td>
                    </tr>
                    <tr class="table-secondary">
                      <th>Place of Violation</th>
                      <th>Violation Time</th>
                    </tr>
                    <tr>
                      <td>${violation.placeOfViolation}</td>
                      <td>${violation.passingDateTime}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      `;
      //modalBody.innerHTML = `Helo Modal Title - ID: ${id}, Camera: ${camera}, Direction: ${direction}`;
      modalBody.innerHTML = modalContent;
    }
  }
  loadPreviousViolation(e:Event): void {
    //console.log(e.currentTarget)
    let indx:any = document.getElementById('indx')?.innerText;
    let prevIndx = parseInt(indx)-1;
    if (prevIndx >= 0 ){
      console.log(prevIndx)
      this.closeModal();
      this.openModal(prevIndx);
    }
  }
  loadNextViolation(e:Event): void {
    console.log(this.VehicleChallanData.length)
    let indx:any = document.getElementById('indx')?.innerText;
    let nextIndx = parseInt(indx)+1;
    if (nextIndx < this.VehicleChallanData.length){
      console.log(nextIndx)
      this.closeModal();
      this.openModal(nextIndx);
    }
  }

  closeModal(): void {
    // Close the modal
    const modal = document.getElementById('myModal');
    modal?.classList.remove('show');
    modal?.removeAttribute('style');
  }
}










