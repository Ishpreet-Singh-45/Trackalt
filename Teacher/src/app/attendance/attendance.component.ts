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
		this.dateForAttendance = this.dateForAttendance[2] + '-' + this.dateForAttendance[1] + '-' + this.dateForAttendance[0]
		console.log(this.dateForAttendance)

		let dataToSend =
		{
			classGrade: this.classroomNumber.toString(),
			date: this.dateForAttendance
		}
		this.authService.getStudentAttendance(dataToSend).then( (res: any) =>
		{
			console.log('Student Attendance: ', res)
			this.attInfoList = res.data
			this.attInfo = true;
		})
	}

}






/*
{
	"status": 200,
	"message": "Success",
	"data": [
		{
			"_id": "614bb9ab11234f71423183e0",
			"accountactive": true,
			"role": "student",
			"isDeleted": false,
			"rfid": "rfid_S1",
			"firstName": "Student4",
			"lastName": "Sss2",
			"guardianFirstName": "parentsFirstName",
			"guardianLastName": "parentslastName",
			"guardianEmail": "parent@gmail.com",
			"currentSchool": "CGC",
			"teacher": "Teacher01",
			"email": "student1@gmail.com",
			"classGrade": "10",
			"isVerified": true,
			"status": "Active",
			"createdAt": "2021-09-22T23:18:03.386Z",
			"updatedAt": "2021-09-22T23:18:03.386Z",
			"__v": 0,
			"attendenceStatus": {
				"_id": "614bad9d51e1845a1efe75ae",
				"rfid": "rfid_S1",
				"date": "23-09-2021",
				"status": "tardy",
				"createdAt": "2021-09-22T22:26:37.474Z",
				"updatedAt": "2021-09-22T22:26:37.474Z",
				"__v": 0
			}
		},
		{
			"_id": "614bb9c111234f71423183e8",
			"accountactive": true,
			"role": "student",
			"isDeleted": false,
			"rfid": "rfid_S2",
			"firstName": "Student4",
			"lastName": "Sss2",
			"guardianFirstName": "parentsFirstName",
			"guardianLastName": "parentslastName",
			"guardianEmail": "parent@gmail.com",
			"currentSchool": "CGC",
			"teacher": "Teacher01",
			"email": "student2@gmail.com",
			"classGrade": "10",
			"isVerified": true,
			"status": "Active",
			"createdAt": "2021-09-22T23:18:25.039Z",
			"updatedAt": "2021-09-22T23:18:25.039Z",
			"__v": 0,
			"attendenceStatus": {
				"_id": "614bad7151e1845a1efe75a7",
				"rfid": "rfid_S2",
				"date": "23-09-2021",
				"status": "present",
				"createdAt": "2021-09-22T22:25:53.697Z",
				"updatedAt": "2021-09-22T22:25:53.697Z",
				"__v": 0
			}
		},
		{
			"_id": "614bba0a11234f71423183f3",
			"accountactive": true,
			"role": "student",
			"isDeleted": false,
			"rfid": "rfid_S3",
			"firstName": "rahul",
			"lastName": "Chhabra",
			"guardianFirstName": "parentsFirstName",
			"guardianLastName": "parentslastName",
			"guardianEmail": "parent@gmail.com",
			"currentSchool": "CGC",
			"teacher": "Teacher01",
			"email": "student3@gmail.com",
			"classGrade": "10",
			"isVerified": true,
			"status": "Active",
			"createdAt": "2021-09-22T23:19:38.871Z",
			"updatedAt": "2021-09-22T23:19:38.871Z",
			"__v": 0,
			"attendenceStatus": {
				"_id": "614b4eed5f7f5268669fdeab",
				"rfid": "rfid_S3",
				"date": "23-09-2021",
				"status": "present",
				"createdAt": "2021-09-22T15:42:37.655Z",
				"updatedAt": "2021-09-22T15:42:37.655Z",
				"__v": 0
			}
		},
		{
			"_id": "614cb151d8af69543a5776af",
			"accountactive": true,
			"role": "student",
			"isDeleted": false,
			"rfid": "rfid_S4",
			"firstName": "rahul",
			"lastName": "Chhabra",
			"guardianFirstName": "parentsFirstName",
			"guardianLastName": "parentslastName",
			"guardianEmail": "parent@gmail.com",
			"currentSchool": "CGC",
			"teacher": "Teacher01",
			"email": "student4@gmail.com",
			"classGrade": "10",
			"isVerified": true,
			"status": "Active",
			"createdAt": "2021-09-23T16:54:41.004Z",
			"updatedAt": "2021-09-23T16:54:41.004Z",
			"__v": 0,
			"attendenceStatus": {
				"_id": "614bacb951e1845a1efe7595",
				"rfid": "rfid_S4",
				"date": "23-09-2021",
				"status": "present",
				"createdAt": "2021-09-22T22:22:49.963Z",
				"updatedAt": "2021-09-22T22:22:49.963Z",
				"__v": 0
			}
		}
	]
}

*/
