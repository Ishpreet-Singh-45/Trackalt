import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
declare let $: any;

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teacherList: any;
  email: any;
  password: any;
  firstName: any;
  lastName: any;
  middleName: any;
  mailingAddress: any;
  mailingCity: any;
  mailingState: any;
  mailingZip: any;
  isVerified: any;
  phoneNumber: any;
  countryCode: any;
  accessToken: any;
  accountactive: any;
  confirmtoken: any;
  resetPasswordToken: any;
  resetPasswordExpires: any;
  role: any;
  selectedFiles: any;
  status: any;
  imageUrl: any;
  district: any;
  schoolName: any;
  editDistrict: any;
  addEditDistrictCalendar: any;
  addEditSchoolCalendar: any;
  addEditTeacher: any;
  addEditStudent: any;
  staffId: any;
  workPhone: any;
  position: any;
  grade: any;
  roomNumber: any;
  notes: any;
  teacherId: any;
  userName: any;

  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService, private uploadService: UploadService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getTeachers();
    this.userName = localStorage.getItem("userName");
  }

  getTeachers() {
    this.spinner.show();
    this.authService.getTeachers().then((res: any) => {
      this.teacherList = res['data'];
      console.log("teacher list___________", this.teacherList);
    });
    this.spinner.hide();
  }

  editTeacherData(data: any) {
    console.log(data);
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.middleName = data.middleName;
    this.mailingAddress = data.mailingAddress;
    this.mailingCity = data.mailingCity;
    this.mailingState = data.mailingState;
    this.mailingZip = data.mailingZip;
    this.isVerified = data.isVerified;
    this.phoneNumber = data.phoneNumber;
    this.countryCode = data.countryCode;
    this.accessToken = data.accessToken;
    this.accountactive = data.accountactive;
    this.confirmtoken = data.confirmtoken;
    this.resetPasswordToken = data.resetPasswordToken;
    this.resetPasswordExpires = data.resetPasswordExpires;
    this.role = 'teacher';
    this.status = data.status;
    this.imageUrl = data.imageUrl;
    this.district = data.district;
    this.schoolName = data.schoolName;
    this.editDistrict = data.editDistrict;
    this.addEditDistrictCalendar = data.addEditDistrictCalendar;
    this.addEditSchoolCalendar = data.addEditSchoolCalendar;
    this.addEditTeacher = data.addEditTeacher;
    this.addEditStudent = data.addEditStudent;
    this.staffId = data.staffId;
    this.workPhone = data.workPhone;
    this.position = data.position;
    this.grade = data.grade;
    this.roomNumber = data.roomNumber;
    this.notes = data.notes;
    this.teacherId = data._id;
    $('#editTeacherModal').modal('show');
  }

  deleteTeacherData(data: any) {
    this.teacherId = data._id;
    $('#deleteTeacherModal').modal('show');
  }

  cancelDelete() {
    $('#deleteTeacherModal').modal('hide');
  }

  editTeacher() {
    this.spinner.show();
    let dataToSend = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      mailingAddress: this.mailingAddress,
      mailingCity: this.mailingCity,
      mailingState: this.mailingState,
      mailingZip: this.mailingZip,
      isVerified: this.isVerified,
      phoneNumber: this.phoneNumber,
      countryCode: this.countryCode,
      accountactive: this.accountactive,
      imageUrl: this.imageUrl,
      district: this.district,
      schoolName: this.schoolName,
      editDistrict: this.editDistrict,
      addEditDistrictCalendar: this.addEditDistrictCalendar,
      addEditSchoolCalendar: this.addEditSchoolCalendar,
      addEditTeacher: this.addEditTeacher,
      addEditStudent: this.addEditStudent,
      staffId: this.staffId,
      workPhone: this.workPhone,
      position: this.position,
      grade: this.grade,
      roomNumber: this.roomNumber,
      notes: this.notes,
      role: 'teacher'
    }
    console.log("tecaher id_________--", this.teacherId);
    this.authService.editTeacher(this.teacherId, dataToSend).then((res: any) => {
      console.log("edit teacher res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#editTeacherModal').modal('hide');
        this.getTeachers();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  disableTeacher(data: any) {
    this.teacherId = data._id;
    this.spinner.show();
    let dataToSend = {
      _id: data._id,
      status: 'Inactive',
    }
    this.authService.editTeacher(this.teacherId, dataToSend).then((res: any) => {
      console.log("edit teacher res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#editTeacherModal').modal('hide');
        this.getTeachers();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  enableTeacher(data: any) {
    this.teacherId = data._id;
    this.spinner.show();
    let dataToSend = {
      _id: data._id,
      status: 'Active',
    }
    this.authService.editTeacher(this.teacherId, dataToSend).then((res: any) => {
      console.log("edit teacher res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#editTeacherModal').modal('hide');
        this.getTeachers();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  openAddModal() {
    console.log("open");
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.middleName = "";
    this.mailingAddress = "";
    this.mailingCity = "";
    this.mailingState = "";
    this.mailingZip = "";
    this.isVerified = "";
    this.phoneNumber = "";
    this.countryCode = "";
    this.accessToken = "";
    this.accountactive = "";
    this.confirmtoken = "";
    this.resetPasswordToken = "";
    this.resetPasswordExpires = "";
    this.status = "";
    this.imageUrl = "";
    this.district = "";
    this.schoolName = "";
    this.editDistrict = "";
    this.addEditDistrictCalendar = "";
    this.addEditSchoolCalendar = "";
    this.addEditTeacher = "";
    this.addEditStudent = "";
    this.staffId = "";
    this.workPhone = "";
    this.position = "";
    this.grade = "";
    this.roomNumber = "";
    this.notes = "";
    this.teacherId = "";

    $('#addTeacherModal').modal('show');
  }

  addTeacher() {
    this.spinner.show();
    let dataToSend = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      mailingAddress: this.mailingAddress,
      mailingCity: this.mailingCity,
      mailingState: this.mailingState,
      mailingZip: this.mailingZip,
      isVerified: this.isVerified,
      phoneNumber: this.phoneNumber,
      countryCode: this.countryCode,
      accountactive: this.accountactive,
      imageUrl: this.imageUrl,
      district: this.district,
      schoolName: this.schoolName,
      editDistrict: this.editDistrict,
      addEditDistrictCalendar: this.addEditDistrictCalendar,
      addEditSchoolCalendar: this.addEditSchoolCalendar,
      addEditTeacher: this.addEditTeacher,
      addEditStudent: this.addEditStudent,
      staffId: this.staffId,
      workPhone: this.workPhone,
      position: this.position,
      grade: this.grade,
      roomNumber: this.roomNumber,
      notes: this.notes,
      role: 'teacher'
    }
    console.log("data____________", dataToSend)
    this.authService.addTeacher(dataToSend).then((res: any) => {
      console.log("add teacher res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#addTeacherModal').modal('hide');
        this.getTeachers();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    })
  }

  deleteTeacher() {
    this.spinner.show();
    let dataToSend = {
      isDeleted: true
    }
    this.authService.deleteTeacher(this.teacherId, dataToSend).then((res: any) => {
      console.log("delete teacher res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#deleteTeacherModal').modal('hide');
        this.getTeachers();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
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

  cancelAdd() {
    $('#addTeacherModal').modal('hide');
  }

  cancelEdit() {
    $('#editTeacherModal').modal('hide');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

  home() {
    this.router.navigate(['/dashboard'])
  }

}

