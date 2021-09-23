import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
	selector: 'app-students',
	templateUrl: './students.component.html',
	styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit 
{
	userName: any;
	studentInfo: any;
	studentInfoList: any;
	classroomNumber: any

	constructor(
		private router: Router
	) 
	{ }

	ngOnInit(): void 
	{
		this.userName = localStorage.getItem('userName')
		this.getStudentsInfo()
	}

	// Log out functionality
	logout()
	{
		localStorage.clear()
		this.router.navigate(['login'])
	}
	getStudentsInfo()
	{
		this.studentInfo = true;
		this.studentInfoList =
		[
			{
				date: 'ABC asda',
				status: 'Present',
				rfid: "rfid_S1"
			},
			{
				date: 'ASD ASasda',
				status: 'Absent',
				rfid: "rfid_S2"
			},
			{
				date: 'AS as',
				status: 'Tardy',
				rfid: "rfid_S3"
			}
		]
	}

}
