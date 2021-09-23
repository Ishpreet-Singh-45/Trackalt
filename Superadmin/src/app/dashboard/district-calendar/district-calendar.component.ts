import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
declare let $: any;

@Component({
  selector: 'app-district-calendar',
  templateUrl: './district-calendar.component.html',
  styleUrls: ['./district-calendar.component.scss']
})
export class DistrictCalendarComponent implements OnInit {
  districtCalendarList: any;
  holidayCalendarList: any;
  schoolCalendraName: any;
  startDate: any;
  endDate: any;
  status: any;
  districtCalendarId: any;
  districtHolidayName: any;
  holidayStartDate: any;
  holidayEndDate: any;
  holidayId: any;
  userName: any;
  searchText: any;

  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getDistrictCalendar();
    this.getHolidayCalendar();
    this.userName = localStorage.getItem("userName");
  }

  getDistrictCalendar() {
    this.spinner.show();
    this.authService.getDistrictCalendar().then((res: any) => {
      this.districtCalendarList = res['data'];
      this.spinner.hide();
      console.log("district list___________", this.districtCalendarList);
    });
  }

  getHolidayCalendar() {
    this.spinner.show();
    this.authService.getHolidayCalendar().then((res: any) => {
      console.log(res)
      this.holidayCalendarList = res['data'];
      //console.log(this.holidayCalendarList[15].holidayStartDate.split('T')[0])
      this.spinner.hide();
      console.log("holiday list___________", this.holidayCalendarList);
    });
  }

  editDistrictCalendarData(data: any) {
    console.log(data);
    this.districtCalendarList = data.districtCalendarList;
    this.schoolCalendraName = data.schoolCalendraName;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.status = data.status;
    this.districtCalendarId = data._id;
    $('#editDistrictModal').modal('show');
  }

  deleteDistrictData(data: any) {
    this.districtCalendarId = data._id;
    $('#deleteDistrictModal').modal('show');
  }

  cancelDelete() {
    $('#deleteDistrictModal').modal('hide');
  }

  editDistrict() {
    this.spinner.show();
    let dataToSend = {
      districtCalendarList: this.districtCalendarId,
      schoolCalendraName: this.schoolCalendraName,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status
    }
    this.authService.editDistrictCalendar(this.districtCalendarId, dataToSend).then((res: any) => {
      console.log("edit district res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#editDistrictModal').modal('hide');
        this.getDistrictCalendar();
        this.spinner.hide();
        this.schoolCalendraName = "";
        this.startDate = "";
        this.endDate = "";
        this.status = "";
        this.districtCalendarId = "";
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    })
  }

  openAddModal() {
    console.log("open")
    $('#addDistrictModal').modal('show');
    this.schoolCalendraName = "";
    this.startDate = "";
    this.endDate = "";
    this.status = "";
    this.districtCalendarId = "";
  }

  addDistrict() {
    this.spinner.show();
    if(Date.parse(this.startDate)>Date.parse(this.endDate)){
      this.toastr.error('start date must be smaller than end date');
      this.spinner.hide();
    }
    else{
      let dataToSend = {
        schoolCalendraName: this.schoolCalendraName,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.status
      } 
      this.authService.addDistrictCalendar(dataToSend).then((res: any) => {
        console.log("add district res", res);
        if (res['status'] == 200) {
          this.toastr.success(res['message'], 'Success');
          $('#addDistrictModal').modal('hide');
          this.getDistrictCalendar();
          this.spinner.hide();
        } else {
          this.toastr.error(res['message'], 'Error');
          this.spinner.hide();
        }
      })
    }
  }
  openAddHolidayModal() {
    console.log("open")
    $('#addHolidayModal').modal('show');
    this.districtHolidayName = "";
    this.holidayStartDate = "";
    this.holidayEndDate = "";
    this.holidayId = "";
  }

  addHoliday() {
    this.spinner.show();
    if(Date.parse(this.holidayStartDate)>Date.parse(this.holidayEndDate)){
      this.toastr.error('start date must be smaller than end date');
      this.spinner.hide();
    }
    else{
      let dataToSend = {
        schoolName: this.districtHolidayName,
        holidayStartDate: this.holidayStartDate,
        holidayEndDate: this.holidayEndDate,
      }
      console.log(this.districtHolidayName)
      this.authService.addHolidayCalendar(dataToSend).then((res: any) => {
        console.log("add holiday res", res);
        if (res['status'] == 200) {
          this.toastr.success(res['message'], 'Success');
          $('#addHolidayModal').modal('hide');
          this.getHolidayCalendar();
          this.spinner.hide();
        } else {
          this.toastr.error(res['message'], 'Error');
          this.spinner.hide();
        }
      })
    }
  }
  
  deleteDistrict() {
    this.spinner.show();
    let dataToSend = {
      isDeleted: true
    }
    this.authService.deleteDistrictCalendar(this.districtCalendarId, dataToSend).then((res: any) => {
      console.log("delete district res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#deleteDistrictModal').modal('hide');
        this.getDistrictCalendar();
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

  cancelAddHoliday() {
    $('#addHolidayModal').modal('hide');
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


}

