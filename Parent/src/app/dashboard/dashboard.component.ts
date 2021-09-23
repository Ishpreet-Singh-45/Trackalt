import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit
{
	firstName: any;
	lastName: any;
	phoneNumber: any;
	userName: any;
	user: any;
	userId: any;
	profileComplete: any;

	constructor(
		private router: Router,
		private authService: AuthService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService
		) { }


	/**
	 * Check if the profile is completed or not on initialization of Dashboard Component
	*/
	ngOnInit(): void
	{
		this.userName = localStorage.getItem("userName");
		this.user = localStorage.getItem("user");
		this.user = JSON.parse(this.user);
		console.log("user_______________", this.user);

		// If found all three variables from response data
		if (this.user['firstName'] && this.user['lastName'] && this.user['phoneNumber'])
		{
			// Profile is completed
			this.firstName = this.user['firstName']

			console.log("profile complete");	// Output: Profile incomplete
			this.profileComplete = true;
		} else
		{
			// Profile is incomplete
			console.log("profile incomplete");	// Output: Profile Incomplete
			this.profileComplete = false;
			this.userId = this.user['_id'];
		}
	}

	// Logout Functionality
	logout() {
		localStorage.clear();
		this.router.navigate(['/login']);
		return false;
	}


	// Profile Completion page
	completeProfile()
	{
		this.spinner.show();

		// if any of the fields are missing, show error
		if (!this.firstName || !this.lastName || !this.phoneNumber)
		{
			// An error toastr (Description, heading)
			this.toastr.error('All fields are required.', 'Error');
			this.spinner.hide();
		} else
		{
			let dataToSend = {
				firstName: this.firstName,
				lastName: this.lastName,
				phoneNumber: this.phoneNumber,
			}

			// sends the data to backend api with appropriate data
			this.authService.completeUserProfile (dataToSend, this.userId).then( (res: any) =>
			{
				console.log(res)
				if (res['status'] == 200)
				{
					// Success toastr
					this.toastr.success('Profile successfully updated!', 'Success');
					// this.authService.storeUserData(res['data']['accessToken']);
					// localStorage.setItem("user", res['data']);
					this.profileComplete = true;
					this.router.navigate(['/dashboard']);
				} else
				{
					this.toastr.error(res['message'], 'Error');
				}
				this.spinner.hide();
			});
		}
	}

	lettersOnly(event: any) {
		var charCode = event.keyCode;
		console.log("event_________", event, charCode)
		if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32)
			return true;
		else
			return false;
	}

}
