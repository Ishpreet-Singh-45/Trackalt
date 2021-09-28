import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
@Injectable({
	providedIn: 'root'
})

export class DashboardComponent implements OnInit 
{
	userName: any;
	role:any
	userSetup_tab = false;

	constructor(
		private router: Router
	) 
	{}

	ngOnInit(): void
	{
		this.userName = localStorage.getItem("userName");
		console.log("username", this.userName)
		this.role = localStorage.getItem("role");
		console.log("username", this.userName)
	}

	logout() 
	{
		localStorage.clear();
		this.router.navigate(['/login']);
		return false;
	}

	home() 
	{
		console.log('home')
		this.userSetup_tab = false;
	}

	userSetup() 
	{
		console.log('Home()')
		this.userSetup_tab = true;
	}

}
