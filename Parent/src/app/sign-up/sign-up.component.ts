import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email: any;
  password: any;
  confirmPassword: any;
  privacyPolicy = false;

  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }


  ngOnInit(): void {
  }

  signUp() {
    this.spinner.show();
    console.log("signUp user__________________", this.privacyPolicy);
    if (!this.email || !this.password || !this.confirmPassword) {
      this.toastr.error('All fields are required.', 'Error');
      this.spinner.hide();
    } else if (this.password != this.confirmPassword) {
      this.toastr.error('Password do not match.', 'Error');
      this.spinner.hide();
    } else if (!this.privacyPolicy) {
      this.toastr.error('Please accept all the terms and privacy policy to continue.', 'Error');
      this.spinner.hide();
    } else {
      let dataToSend = {
        email: this.email,
        password: this.password,
        role: 'parent'
      }

      this.authService.signUp(dataToSend).then((res: any) => {
        console.log("signup res_____________", res);
        if (res['status'] == 200) {
          this.toastr.success('Successfully Signed Up!', 'Success');
          this.authService.storeUserData(res['data']['accessToken']);
          localStorage.setItem("user", res['data']);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error(res['message'], 'Error');
        }
        this.spinner.hide();
      });
    }
  }

  login()
  {
    this.router.navigate(['/login']);
  }

}
