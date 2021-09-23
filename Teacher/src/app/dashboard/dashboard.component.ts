import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit
{
	userName: any;


	constructor(
		private router: Router
	) { }

	ngOnInit(): void
	{
		this.userName = localStorage.getItem("userName");
	}

	logout()
	{
		localStorage.clear();
		this.router.navigate(['/login']);
		return false;
	}

}
