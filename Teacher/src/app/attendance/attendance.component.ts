import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
	selector: 'app-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit
{
	userName: any;
	attInfo: any;
	attInfoList: any;
	classroomNumber: any
	classroomList: any
	dateForAttendance: any
	date: any


	constructor(
		private router: Router,
		private authService: AuthService
	) { }


	ngOnInit(): void
	{
		this.userName = localStorage.getItem("userName");
		// this.getClassroomList()
	}


	logout()
	{
		localStorage.clear();
		this.router.navigate(['/login']);
		return false;
	}


	getStudentAttendance()
	{
		console.log(this.classroomNumber)
		this.dateForAttendance = this.dateForAttendance.split('-')
		this.dateForAttendance = this.dateForAttendance[2] + '/' + this.dateForAttendance[1] + '/' + this.dateForAttendance[0]
		console.log(this.dateForAttendance)
		/*
		let data =
		{
			classGrade: this.classroomNumber,
			date: this.date
		}
		this.authService.getStudentAttendance(data).then( (res: any) =>
		{
			console.log('Student Attendance: ', res)
		})*/
	}

}
