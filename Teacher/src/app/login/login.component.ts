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
	email: any;
	password: any;

	constructor(
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void
	{
		 console.log("Login session_____________________");
	}

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
				console.log("login res________________", res);
				if (res['status'] == 1)
				{
					if (res['data']['role'] == 'teacher')
					{
						this.toastr.success('Successfully Logged In', 'Success');

						// localStorage - setItem <userName>
						let userName = res['data']['firstName'].charAt(0).toUpperCase() + res['data']['firstName'].slice(1) +
								" " + res['data']['lastName'].charAt(0).toUpperCase() + res['data']['lastName'].slice(1);
						localStorage.setItem("userName", userName);

						this.router.navigate(['/dashboard']);	// navigate to dashboard
					} else
					{
						// Is role other than Teacher?
						this.toastr.error("Authorization error", 'Error');
						this.spinner.hide();
					}
					this.authService.storeUserData(res['data']['accessToken']);
				} else
				{
					this.toastr.error(res['message'], 'Error');
				}
				this.spinner.hide();
			});
		}
	}

}
