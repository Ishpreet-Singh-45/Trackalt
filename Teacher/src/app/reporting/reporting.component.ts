import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-reporting',
	templateUrl: './reporting.component.html',
	styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit
{
	userName: any

	constructor(
		private router: Router)
	{ }

	ngOnInit(): void
	{
		this.userName = localStorage.getItem('userName')
	}

	// Log out functionality
	logout()
	{
		localStorage.clear()
		this.router.navigate(['login'])
	}

}
