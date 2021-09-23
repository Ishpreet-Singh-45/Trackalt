import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';

declare let $: any;

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  schoolList: any;
  schoolId: any;
  schoolName: any;
  code: any;
  year: any;
  officeEmail: any;
  officePhoneNumber: any;
  officeFaxNumber: any;
  physicalAddress: any;
  physicalCity: any;
  physicalDistrict: any;
  physicalZip: any;
  //districtName:any;
  mailingAddress: any;
  mailingCity: any;
  mailingState: any;
  mailingZip: any;
  principalFirstName: any;
  principalLastName: any;
  principalPhoneNumber: any;
  principalEmail: any;
  userName: any;
  selectedFiles: any;
  imageUrl: any;
  districtList:any;
  isChecked=false;
  dataToSend:any;

  constructor(
  	private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService, private uploadService: UploadService
  )
  { }

  ngOnInit(): void {
    this.getSchool();
    this.getDistrict();
    this.userName = localStorage.getItem("userName");
  }

  async selectFile(event: any) {
    console.log("in select file")
    this.selectedFiles = event.target.files;
    var reader = new FileReader();
    reader.onload = (event1: any) => {
      this.imageUrl = event1.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    const file = this.selectedFiles ? this.selectedFiles.item(0) : '';
    if (file) {
      let dataS = await this.uploadService.uploadFile(file);
      this.imageUrl = dataS.Location;
    }
  }

  getSchool() {
    this.spinner.show();
    this.authService.getSchool().then((res: any) => {
      this.schoolList = res['data'];
      this.spinner.hide();
      console.log("school list___________", this.schoolList);
    });
  }

  getDistrict()
  {
    this.spinner.show();
    this.authService.getAllDistrict().then( (res: any) => {
      this.districtList = res['data'];
      this.spinner.hide();
      console.log("school list___________", this.districtList);
    });
  }

  editSchoolData(data: any) {
    console.log("edit school data", data);
    this.schoolName = data.name;
    this.code = data.code;
    this.year = data.year;
    this.officeEmail = data.officeEmail;
    this.officePhoneNumber = data.officePhoneNumber;
    this.officeFaxNumber = data.officeFaxNumber;
    this.physicalAddress = data.physicalAddress;
    this.physicalCity = data.physicalCity;
    this.physicalDistrict = data.physicalDistrict;
    this.physicalZip = data.physicalZip;
    this.mailingAddress = data.mailingAddress;
    this.mailingCity = data.mailingCity;
    this.mailingState = data.mailingState;
    this.mailingZip = data.mailingZip;
    this.principalFirstName = data.principalFirstName;
    this.principalLastName = data.principalLastName;
    this.principalPhoneNumber = data.principalPhoneNumber;
    this.principalEmail = data.principalEmail;
    this.schoolId = data._id;
    $('#editSchoolModal').modal('show');
  }

  editSchool() {
    console.log("edit school func")
    this.spinner.show();
    let dataToSend = {
      name: this.schoolName,
      code: this.code,
      year: this.year,
      officeEmail: this.officeEmail,
      officePhoneNumber: this.officePhoneNumber,
      officeFaxNumber: this.officeFaxNumber,
      physicalAddress: this.physicalAddress,
      physicalCity: this.physicalCity,
      physicalDistrict: this.physicalDistrict,
      physicalZip: this.physicalZip,
      mailingAddress: this.mailingAddress,
      mailingCity: this.mailingCity,
      mailingState: this.mailingState,
      mailingZip: this.mailingZip,
      principalFirstName: this.principalFirstName,
      principalLastName: this.principalLastName,
      principalPhoneNumber: this.principalPhoneNumber,
      principalEmail: this.principalEmail
    }
    this.authService.editSchool(this.schoolId, dataToSend).then((res: any) => {
      console.log("edit school res", res);
      if (res['status'] == 200) {
        this.getSchool();
        this.toastr.success(res['message'], 'Success');
        $('#editSchoolModal').modal('hide');
        this.schoolName = "";
        this.code = "";
        this.year = "";
        this.officeEmail = "";
        this.officePhoneNumber = "";
        this.officeFaxNumber = "";
        this.physicalAddress = "";
        this.physicalCity = "";
        this.physicalDistrict = "";
        this.physicalZip = "";
        this.mailingAddress = "";
        this.mailingCity = "";
        this.mailingState = "";
        this.mailingZip = "";
        this.principalFirstName = "";
        this.principalLastName = "";
        this.principalPhoneNumber = "";
        this.principalEmail = "";
        this.schoolId = "";
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    })
  }

  deleteSchoolData(data: any) {
    this.schoolId = data._id;
    $('#deleteSchoolModal').modal('show');
  }

  cancelDelete() {
    $('#deleteSchoolModal').modal('hide');
  }

  openAddModal() {
    console.log("open");
    this.schoolName = "";
    this.code = "";
    this.year = "";
    this.officeEmail = "";
    this.officePhoneNumber = "";
    this.officeFaxNumber = "";
    this.physicalAddress = "";
    this.physicalCity = "";
    this.physicalDistrict = "";
    this.physicalZip = "";
    //this.isChecked="";
    //this.districtName = "";
    this.mailingAddress = "";
    this.mailingCity = "";
    this.mailingState = "";
    this.mailingZip = "";
    this.principalFirstName = "";
    this.principalLastName = "";
    this.principalPhoneNumber = "";
    this.principalEmail = "";
    this.schoolId = "";
    $('#addSchoolModal').modal('show');
  }


  addSchool() {
    this.spinner.show();
    if(this.isChecked){
      this.dataToSend = {
        name: this.schoolName,
        code: this.code,
        year: this.year,
        officeEmail: this.officeEmail,
        officePhoneNumber: this.officePhoneNumber,
        officeFaxNumber: this.officeFaxNumber,
        physicalAddress: this.physicalAddress,
        physicalCity: this.physicalCity,
        physicalDistrict: this.physicalDistrict,
        physicalZip: this.physicalZip,
        mailingAddress: this.physicalAddress,
        mailingCity: this.physicalCity,
        mailingState: this.physicalDistrict,
        mailingZip: this.physicalZip,
        principalFirstName: this.principalFirstName,
        principalLastName: this.principalLastName,
        principalPhoneNumber: this.principalPhoneNumber,
        principalEmail: this.principalEmail
      }
    }
    else{
        this.dataToSend = {
          name: this.schoolName,
          code: this.code,
          year: this.year,
          officeEmail: this.officeEmail,
          officePhoneNumber: this.officePhoneNumber,
          officeFaxNumber: this.officeFaxNumber,
          physicalAddress: this.physicalAddress,
          physicalCity: this.physicalCity,
          physicalDistrict: this.physicalDistrict,
          physicalZip: this.physicalZip,
          isChecked:this.isChecked,
          mailingAddress: this.mailingAddress,
          mailingCity: this.mailingCity,
          mailingState: this.mailingState,
          mailingZip: this.mailingZip,
          principalFirstName: this.principalFirstName,
          principalLastName: this.principalLastName,
          principalPhoneNumber: this.principalPhoneNumber,
          principalEmail: this.principalEmail
        }
      }
    console.log("full data",this.dataToSend)
    console.log("chekbox",this.isChecked)
    console.log("district",this.physicalZip)
    this.authService.addSchool(this.dataToSend).then((res: any) => {
      console.log("add school res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#addSchoolModal').modal('hide');
        this.getSchool();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  deleteSchool() {
    this.spinner.show();
    let dataToSend = {
      isDeleted: true
    }
    this.authService.deleteSchool(this.schoolId, dataToSend).then((res: any) => {
      console.log("delete school res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#deleteSchoolModal').modal('hide');
        this.getSchool();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  cancelAdd() {
    $('#addSchoolModal').modal('hide');
  }

  cancelEdit() {
    $('#editSchoolModal').modal('hide');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

  home() {
    this.router.navigate(['/dashboard'])
  }

  lettersOnly(event: any) {
    var charCode = event.keyCode;
    console.log("event_________", event, charCode)
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32)
      return true;
    else
      return false;
  }

}

