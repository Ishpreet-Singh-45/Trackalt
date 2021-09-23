


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
	// credential: parent1@yopmail.com Test@1234
	email: any;
	password: any;

	constructor(
		private authService: AuthService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit(): void {
	}


	// Log In Functionality
	login()
	{
		this.spinner.show();
		if (!this.email || !this.password)
		{
			this.toastr.error('All fields are required.', 'Error');
			this.spinner.hide();
		}
		else
		{
			let dataToSend =
			{
				email: this.email,
				password: this.password
			}
			this.authService.login(dataToSend).then( (res: any) =>
			{
				console.log("login res________________", res);	// Output: Server Response
				if (res['status'] == 1)
				{
					if (res['data']['role'] == 'parent')
					{
						this.toastr.success('Successfully Logged In', 'Success');
						this.authService.storeUserData(res['data']['accessToken']);

						// localStorage - setItem <userName> <user>
						let userName = res['data']['firstName'].charAt(0).toUpperCase() + res['data']['firstName'].slice(1) +
							" " + res['data']['lastName'].charAt(0).toUpperCase() + res['data']['lastName'].slice(1);
						localStorage.setItem("userName", userName);
						localStorage.setItem("user", JSON.stringify(res['data']));

						this.router.navigate(['/dashboard']);
					} else
					{
						this.toastr.error("Authorization error", 'Error');
						this.spinner.hide();
					}
				} else
				{
					this.toastr.error(res['message'], 'Error');
				}
				this.spinner.hide();
			});
		}
	}


	// Sign Up Functionality
	signUp() {
		this.router.navigate(['/signup']);
	}

}
