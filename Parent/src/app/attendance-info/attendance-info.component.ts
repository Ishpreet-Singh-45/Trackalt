import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-attendance-info',
  templateUrl: './attendance-info.component.html',
  styleUrls: ['./attendance-info.component.scss']
})
export class AttendanceInfoComponent implements OnInit
{
	srNo: any = 1
	searchText: any
	userName: any
	attInfo: any
	attInfoList: any
	studentInfo: any


  constructor(
  	private router: Router,
  	private spinner: NgxSpinnerService,
  	private service: AuthService
  	)
  { }

  ngOnInit(): void
  {
  	this.userName = localStorage.getItem('userName')
  	// this.attInfoList = this.getAttInfo()
  	this.getAttInfo('rfid_S1')
  }


	search()
	{
		this.spinner.show()
		console.log('Search Function')
		this.spinner.hide()
	}

	// Log Out Functionality
	logout()
	{
		this.spinner.show()
		localStorage.clear()
		this.router.navigate(['login'])
		this.spinner.hide()
	}

	getAttInfo(name: string)
	{
		// Server should respond an array of objects
		this.service.getAttInfo(name).then( (res: any) =>
		{
			console.log('Attendance Info ----------- ', res)
			if(res.status == 200)
			{
				this.attInfo = true
				this.attInfoList = res.data
				this.studentInfo = res.studentInfo
			}
		})
	}

}
