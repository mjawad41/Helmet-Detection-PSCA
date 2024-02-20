import { Component, Input, OnInit,ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclePassingService } from '../services/vehiclepassing.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-faceverification',
  templateUrl: './faceverification.component.html',
  styleUrls: ['./faceverification.component.css'],
  encapsulation: ViewEncapsulation.None, // Add this line


})
export class FaceverificationComponent implements OnInit {

  constructor(private route: ActivatedRoute,private echallan_service: VehiclePassingService,private toastr: ToastrService,private router: Router){}
  vehiclePassingID: any;

  VehicleChallanData:any;

  VehicleExciseResponse:any;
 //This is used to get Excise Record using Vehicle No Plate
  VehiclePlate:string='';

  startDate: string='';
  endDate: string='';
  locationId:number=0;
  PassingTypeId:number=1;

  currentIndex: number = 0;

  AddChallanData:any; //Varibale to send to Add Echallan Data

  InvalidData:any;

  isLoading: boolean = false;

  TotalSize:number=0;
  startIndex:number=1;
//This is used to get the image of cropped image
  ImagePath:string='';

  DriverFacialResponse:any;

  FacialData:any;

  filteredImages:any[]=[];

  ngOnInit(): void {

    // Retrieve the query parameters directly from the snapshot
    // this.startDate = this.route.snapshot.queryParams['startDate'];
    // this.endDate = this.route.snapshot.queryParams['endDate'];
    // this.locationId= this.route.snapshot.queryParams['locationId']
    // this.PassingTypeId= this.route.snapshot.queryParams['PassingTypeId'];

      // Subscribe to the route parameters observable
      // this.route.params.subscribe(params => {
      // // Retrieve the value of the vehiclePassingID parameter
      // this.vehiclePassingID = +params['id']; // '+' is used to convert the parameter to a number
      // // Now you can use this.vehiclePassingID in your component logic

      // console.log(this.vehiclePassingID);
      // console.log(this.locationId);
      // console.log(this.startDate)
      // console.log(this.endDate)
      // console.log(this.locationId)
      // if(this.startDate!=null && this.endDate!=null && this.locationId!=null)
      // {
      this.Search();
      this.getFacialData();
      // }
      // else
      // {
      //   this.router.navigate(['/']);
      // }

      //   });


      }


  Search()
{
  // this.isLoading = true;
  // this.echallan_service.getServerSideVehiclePassingData(this.startDate,this.endDate,this.locationId, this.PassingTypeId,1,100,"",0)
  //   .subscribe({
  //     next: (value:any) => {
  //       console.log("Response in ",value)
  //       if(value==null || value.length === 0)
  //       {
  //         this.router.navigate(['/']);
  //       }
     
  //     this.VehicleChallanData=value.data
      
  //     this.TotalSize=value.data.length;
  //     this.isLoading = false;

  //     },
  //     error: (err:any) => {
  //     console.log(err)
  //     },
  //   });

  this.VehicleChallanData=[
    {
      deviceName: "3702-R-Canal Mall-EW-P2A3",
      drivingDirection: "Before Gulberg Fountain E To W",
      passingDateTime: "2024-02-13T13:10:41",
      photopath: "http://10.20.13.151/HelmetImages/WihtoutHelmet/2024/02/13/24dba127-0531-4533-bcc7-db3f67175ef7.jpg",
      placeOfViolation: "Before Gulberg Fountain",
      vehiclePassingID: 26107
    }
  ];

    
}

onFileSelected(event: any): void {
  const file = event?.target?.files?.[0];

  if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          const base64Image = e.target.result;
          const imageDataWithoutPrefix = base64Image.split(',')[1]; // Remove the prefix
          this.ImagePath = imageDataWithoutPrefix;
      };

      reader.readAsDataURL(file);
  }
}

getFacialData()
{
  this.echallan_service.getFacialData().subscribe({

    next:(value:any)=>
    {
    console.log(value);
    this.FacialData=value;

    this.filteredImages=value
    console.log("fff",this.filteredImages)
    },

    error:(value:any)=>
    {

    }


  })
}


filterImages(filter: string) {
  if (filter === 'all') {
    this.filteredImages = this.FacialData;
  } else {
    this.filteredImages = this.FacialData.filter((data:any) => data.matchingLevel === filter);
  }
}

Test(id:number)
{
  console.log(id)
  this.DriverFacialResponse=this.filteredImages.filter((data:any)=>data.id==id)

  console.log(this.DriverFacialResponse)
}



Query()
{
  console.log(this.ImagePath)

  // this.DriverFacialResponse={
  //   Name: "Awais Ahmad",
  //   FatherName: "Deen Muhammad",
  //   Cnic: "35202-8446422-3",
  //   Address: "House no 29 Moh Agha",
    
  // }

  
  // this.echallan_service.getExciseData(this.VehiclePlate)
  //   .subscribe({
  //     next: (value:any) => {
       
  //     this.VehicleExciseResponse=value;

  //     },
  //     error: (err:any) => {
  //       console.error('Error:', err);
  //     },
  //   });
}

Valid()
{
  if(this.VehicleChallanData.length==0)
  {
    this.router.navigate(['/']);
  }
  
  // this.AddChallanData={

  //   ChallanID:123,

  //   VehiclePassingID:this.VehicleChallanData[this.currentIndex].vehiclePassingID,

  //   PlateNo:this.VehiclePlate,

  //   PenaltyAmount:2000,

  //   DateOfOffense:this.VehicleChallanData[this.currentIndex].passingDateTime.split('T')[0],

  //   TimeOfOffense:this.VehicleChallanData[this.currentIndex].passingDateTime,

  //   ViolationType:"No Helmet Offense",
    
  //   DrivingDirection: this.VehicleChallanData[this.currentIndex].drivingDirection,

  //   LaneNo: 2,

  //   PlaceOfViolation: this.VehicleChallanData[this.currentIndex].placeOfViolation,

  //   OwnerName: this.VehicleExciseResponse.OWNERNAME,

  //   OwnerCNIC: this.VehicleExciseResponse.OWNERCNIC,

  //   OwnerAddress: this.VehicleExciseResponse.OWNERPERMANENTADDRESS,

  //   OwnerCity: this.VehicleExciseResponse.OWNERCITY,

  //   OwnerProvince: "Punjab",
 
  //   VehicleRegNo: this.VehicleExciseResponse.VEH_REG_NO,

  //   ChasisNo: this.VehicleExciseResponse.VEH_CHASIS_NO,

  //   VehicleMakeYear: this.VehicleExciseResponse.MANUFACTUREYEAR.toString(),

  //   VehicleMake: this.VehicleExciseResponse.MAKE.toString(),

  //   VehicleType: this.VehicleExciseResponse.BODYTYPE,

  //   VehicleColor: this.VehicleExciseResponse.COL_NAME,

  //   EngineNo: this.VehicleExciseResponse.VEH_ENGINE_NO,

  //   ConfirmedByName: "Test User",

  //   ConfirmedByID: 1,

  //   photopath: this.VehicleChallanData[this.currentIndex].photopath,

  //   OwnerFatherName: this.VehicleExciseResponse.OWNERFATHERNAME,

  //   EngineType: this.VehicleExciseResponse.ENGINETYPE,

  //   Model: this.VehicleExciseResponse.MODEL.toString(),

  //   Status: this.VehicleExciseResponse.STATUS,

  //   TaxPaidUpTo: this.VehicleExciseResponse.TAXPAIDUPTO,

  //   VehicleEngineSize: this.VehicleExciseResponse.VEH_ENGINE_SIZE,

  //   OwnerPhone1: this.VehicleExciseResponse.OWNERPHONE1,

  //   OwnerPhone2: this.VehicleExciseResponse.OWNERPHONE2,

  //   NoticeNo: null,

  //   ChallanNo: null,

  //   CAT_NAME: "Private",

  //   FIRSTREGISTRATIONDATE: "2020-01-01",

  //   FromIslamabadAPI: false,

  //   VehicleDataSourceCode:this.VehicleExciseResponse.VehicleDataSourceCode,

  // }

  this.AddChallanData={

    VehiclePassingID:this.VehicleChallanData[this.currentIndex].vehiclePassingID,

    PenaltyAmount:2000,

    DateOfOffense:this.VehicleChallanData[this.currentIndex].passingDateTime.split('T')[0],

    TimeOfOffense:this.VehicleChallanData[this.currentIndex].passingDateTime,

    ViolationType:"No Helmet Offense",
    
    DrivingDirection: this.VehicleChallanData[this.currentIndex].drivingDirection,

    LaneNo: 2,

    PlaceOfViolation: this.VehicleChallanData[this.currentIndex].placeOfViolation,

    VehicleType: "MOTOR CYCLE/ SCOOTER",

    ConfirmedByName: "Test User",

    ConfirmedByID: 1,

    photopath: this.VehicleChallanData[this.currentIndex].photopath,

    DriverName: "Awais Ahmad",

    DriverFatherName: "Deen Muhammad",

    DriverCNIC: "35202-8448684-3",

    DriverAddress: "Makan no 29 Moh Agha",

    DriverImagePath: "/path/to/driver/photo.jpg",

    DriverImageBase64: this.ImagePath,


  }
  console.log("Vehicle Challan Data", this.AddChallanData)
  this.echallan_service.AddFaceChallan(this.AddChallanData)
  .subscribe({
    next: (value:any) => {
       
    console.log('xxxxx',value);
    console.log('xxxxx',value.Code);

    this.toastr.success(value.Message, '', {
      positionClass: 'custom-toast-container',
      timeOut:500
    });
    
    // if(value.Code==1)
    // {
    //   this.VehicleChallanData.splice(this.currentIndex, 1);
    //   this.startIndex++;

    //    // Check if the currentIndex exceeds the array length after removal
    //    if (this.currentIndex >= this.VehicleChallanData.length) {
    //     this.currentIndex = this.VehicleChallanData.length - 1;
    //     }

    //   this.toastr.error(value.Message, '', {
    //     positionClass: 'custom-toast-container',
    //     timeOut:500
    //   });

    
    // }
    // else
    // {
    //   this.VehicleExciseResponse=null;
    //   this.AddChallanData=null;
    //   this.VehiclePlate="";
    //   // this.currentIndex++;  
    //   // Remove the element at the current index from the array
    //   this.VehicleChallanData.splice(this.currentIndex, 1);
    //   this.startIndex++;
  
    //   this.toastr.success('Challan Valid Successfully', '', {
    //     positionClass: 'custom-toast-container', // Use the custom class,
    //     timeOut:500
    //   });
  
    //     // Check if the currentIndex exceeds the array length after removal
    //     if (this.currentIndex >= this.VehicleChallanData.length) {
    //       this.currentIndex = this.VehicleChallanData.length - 1;
    //     }
    // }  

    },
    error: (err:any) => {
    console.log(err)
    },
  });
 
}

InValid()
{
  if(this.VehicleChallanData.length==0)
  {
    this.router.navigate(['/']);
  }

  this.echallan_service.InvalidChallan(this.VehicleChallanData[this.currentIndex].vehiclePassingID,1)
  .subscribe({
    next: (value:any) => {
      
    console.log('xxxsqwedwedwexx',value);
    // Remove the element at the current index from the array
    this.VehicleChallanData.splice(this.currentIndex, 1);
    this.startIndex++;
    console.log("Current Index",this.currentIndex);
    console.log("Array Length",this.VehicleChallanData.length);
    this.VehicleExciseResponse=null;
    this.AddChallanData=null;
    this.VehiclePlate="";
    this.toastr.error('Invalid Challan  ', '', {
      positionClass: 'custom-toast-container', // Use the custom class
      timeOut:500
    });

      // Check if the currentIndex exceeds the array length after removal
      if (this.currentIndex >= this.VehicleChallanData.length) {
        this.currentIndex = this.VehicleChallanData.length - 1;
        this.startIndex--;
      }

    },
    error: (err:any) => {
    console.log(err)
    },
  });
 
}

Clone()
{
  
  this.echallan_service.CloneChallan(this.VehicleChallanData[this.currentIndex].vehiclePassingID,2)
  .subscribe({
    next: (value:any) => {
      
    console.log('xxxsqwedwedwexx',value);
    // Remove the element at the current index from the array
    this.VehicleChallanData.splice(this.currentIndex, 1);
    this.startIndex++;
    this.VehicleExciseResponse=null;
    this.AddChallanData=null;
    this.VehiclePlate="";
    this.currentIndex++;
    this.toastr.error('Duplicate Challan', '', {
      positionClass: 'custom-toast-container', // Use the custom class
      timeOut:500
    });

    // Check if the currentIndex exceeds the array length after removal
    if (this.currentIndex >= this.VehicleChallanData.length) {
      this.currentIndex = this.VehicleChallanData.length - 1;
    }

    },
    error: (err:any) => {
    console.log(err)
    },
  });
 
}

// onNextClick() {
//   this.VehicleExciseResponse=null;
//   this.VehiclePlate='';
//   if(this.currentIndex < this.VehicleChallanData.length-1)
//   {
//   this.currentIndex++;
//   this.startIndex++;
//   }

// }

// onPreviousClick()
// {
//   if(this.currentIndex>0)
//   this.currentIndex--;
//   this.startIndex--;
// }

challanImg: string = "./assets/img/violation-img.jpg"

displaySelectedImage(event: any): void {
  const input = event.target;
  const img = document.getElementById('selected-image') as HTMLImageElement;

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e:any) {
      img.src = e.target.result as string;
    };

    reader.readAsDataURL(input.files[0]);
  }
}



}