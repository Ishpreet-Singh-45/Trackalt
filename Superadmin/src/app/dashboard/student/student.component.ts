import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
declare let $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  rfid: any;
  studentId: any;
  studentEmail: any;
  guardianFirstName: any;
  guardianLastName: any;
  guardianEmail: any;
  currentSchool: any;
  teacher: any;
  studentList: any;
  student_id: any;
  userName: any;

  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getStudents();
    this.userName = localStorage.getItem("userName");
  }

  getStudents() {
    this.spinner.show();
    this.authService.getStudents().then((res: any) => {
      this.studentList = res['data'];
      console.log("student list___________", this.studentList);
    });
    this.spinner.hide();
  }

  editStudentData(data: any) {
    console.log(data);
    this.rfid = data.rfid;
    this.studentId = data.studentId;
    this.studentEmail = data.email;
    this.guardianFirstName = data.guardianFirstName;
    this.guardianLastName = data.guardianLastName;
    this.guardianEmail = data.guardianEmail;
    this.currentSchool = data.currentSchool;
    this.teacher = data.teacher;
    this.student_id = data._id;

    $('#editStudentModal').modal('show');
  }

  deleteTeacherData(data: any) {
    this.student_id = data._id;
    $('#deleteStudentModal').modal('show');
  }

  cancelDelete() {
    $('#deleteStudentModal').modal('hide');
  }

  editStudent() {
    this.spinner.show();
    let dataToSend = {
      rfid: this.rfid,
      studentId: this.studentId,
      email: this.studentEmail,
      guardianFirstName: this.guardianFirstName,
      guardianLastName: this.guardianLastName,
      guardianEmail: this.guardianEmail,
      currentSchool: this.currentSchool,
      teacher: this.teacher
    }
    console.log('student id____________', this.student_id)
    this.authService.editStudent(this.student_id, dataToSend).then((res: any) => {
      console.log("edit teacher res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#editStudentModal').modal('hide');
        this.getStudents();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  openAddModal() {
    console.log("open")
    this.rfid = "";
    this.studentId = "";
    this.guardianFirstName = "";
    this.guardianLastName = "";
    this.guardianEmail = "";
    this.currentSchool = "";
    this.teacher = "";
    this.student_id = "";
    this.studentEmail = "";
    $('#addStudentModal').modal('show');
  }

  addStudent() {
    this.spinner.show();
    let dataToSend = {
      rfid: this.rfid,
      studentId: this.studentId,
      email: this.studentEmail,
      guardianFirstName: this.guardianFirstName,
      guardianLastName: this.guardianLastName,
      guardianEmail: this.guardianEmail,
      currentSchool: this.currentSchool,
      teacher: this.teacher
    }
    this.authService.addStudent(dataToSend).then((res: any) => {
      console.log("add student res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#addStudentModal').modal('hide');
        this.getStudents();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    })
  }

  deleteStudent() {
    this.spinner.show();
    let dataToSend = {
      isDeleted: true
    }
    this.authService.deleteStudent(this.student_id, dataToSend).then((res: any) => {
      console.log("delete teacher res", res);
      if (res['status'] == 200) {
        this.toastr.success(res['message'], 'Success');
        $('#deleteStudentModal').modal('hide');
        this.getStudents();
        this.spinner.hide();
      } else {
        this.toastr.error(res['message'], 'Error');
        this.spinner.hide();
      }
    });
  }

  cancelAdd() {
    $('#addStudentModal').modal('hide');
  }

  cancelEdit() {
    $('#editStudentModal').modal('hide');
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
