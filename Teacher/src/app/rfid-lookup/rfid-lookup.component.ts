import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-rfid-lookup',
	templateUrl: './rfid-lookup.component.html',
	styleUrls: ['./rfid-lookup.component.scss']
})
export class RfidLookupComponent implements OnInit 
{
	userName: any

	constructor(
		private router: Router
	) 
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
