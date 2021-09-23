import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-child-information',
	templateUrl: './child-information.component.html',
	styleUrls: ['./child-information.component.scss']
})
export class ChildInformationComponent implements OnInit
{
		searchText: any
		userName: any
		childInfo: any
		childInfoList: any

	constructor(
		private router: Router,
		private spinner: NgxSpinnerService

	) { }

	ngOnInit(): void
	{
		this.userName = localStorage.getItem('userName')		// get userName for footer
		this.getChildInfo()

	}


	// searching for particular child
	search()
	{
			console.log('Search Function')
	}

	getChildInfo()
	{

	}

	// Log Out Functionality
	logout()
	{
		this.spinner.show()
		localStorage.clear()
		this.router.navigate(['login'])
		this.spinner.hide()
	}
}
