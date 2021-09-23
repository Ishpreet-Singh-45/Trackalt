import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
declare let $: any;

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {
  districtList: any;
  district: any;
  city: any;
  state: any;
  allowAccess: any;
  districtId: any;
  userName: any;
  role:any;
  searchText = "";

  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getDistrict();
    this.userName = localStorage.getItem("userName");
    this.role = localStorage.getItem("role");
  }

  getDistrict() {
    this.spinner.show();
    let dataToSend = {
      search: this.searchText
    }
    this.authService.getDistrict(dataToSend).then((res: any) => {
      this.districtList = res['data'];
      this.spinner.hide();
      console.log("district list___________", this.districtList);
    });
  }

  editDistrictData(data: any) {
    console.log(data);
    this.district = data.districtName;
    this.city = data.city;
    this.state = data.state;
    this.districtId = data._id;
    $('#editDistrictModal').modal('show');
  }

  deleteDistrictData(data: any) {
    this.districtId = data._id;
    $('#deleteDistrictModal').modal('show');
  }

  cancelDelete() {
    $('#deleteDistrictModal').modal('hide');
  }

  editDistrict() {
    this.spinner.show();
    console.log("district and city and state", this.district, this.city, this.state);
    let dataToSend = {
      districtName: this.district,
      state: this.state,
      city: this.city,
      allowAccess: true
    }
    this.authService.editDistrict(this.districtId, dataToSend).then((res: any) => {
      console.log("edit district res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#editDistrictModal').modal('hide');
        this.getDistrict();
        this.spinner.hide();
        this.district = "";
        this.city = "";
        this.state = "";
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    })
  }

  openAddModal() {
    console.log("open")
    $('#addDistrictModal').modal('show');
    this.district = "";
    this.city = "";
    this.state = "";
  }

  addDistrict() {
    this.spinner.show();
    console.log("district and city and state", this.district, this.city, this.state);
    let dataToSend = {
      districtName: this.district,
      state: this.state,
      city: this.city,
      allowAccess: true
    }
    this.authService.addDistrict(dataToSend).then((res: any) => {
      console.log("add district res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#addDistrictModal').modal('hide');
        this.getDistrict();
        this.spinner.hide();
        console.log("district and city________", this.district, this.city);
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    })
  }

  deleteDistrict() {
    this.spinner.show();
    let dataToSend = {
      isDeleted: true
    }
    this.authService.deleteDistrict(this.districtId, dataToSend).then((res: any) => {
      console.log("delete district res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#deleteDistrictModal').modal('hide');
        this.getDistrict();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  cancelAdd() {
    $('#addDistrictModal').modal('hide');
  }

  cancelEdit() {
    $('#editDistrictModal').modal('hide');
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

  search() {
    let dataToSend = {
      search: this.searchText,
    }
    console.log("data to  search", dataToSend);
    this.authService.getDistrict(dataToSend).then((res: any) => {
      this.districtList = res["data"];
      // this.backButton = true;
      console.log("distrcit___________>>>>>_", res);
    });
  }

}
