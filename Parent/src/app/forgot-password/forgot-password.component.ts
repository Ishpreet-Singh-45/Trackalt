import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  validationCode: any;
  newPassword: any;
  confirmPassword: any;
  email: any;
  emailSent = false;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  sendEmail(value: any) {
    this.spinner.show();
    if (!this.email) {
      this.toastr.error('Please enter your email id.', 'Error');
      this.spinner.hide();
    } else {
      this.authService.forgotPassword(value).then((res: any) => {
        console.log("forgot res______________", res);
        if (res['status'] == 1) {
          this.toastr.success(res['message'], 'Success');
          this.emailSent = true;
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error(res['message'], 'Error');
        }
      });
    }
  }

  reSendEmail(value: any) {
    console.log(value);
    let dataToSend = {
      email: value
    }
    this.spinner.show();
    if (!this.email) {
      this.toastr.error('Please enter your email id.', 'Error');
      this.spinner.hide();
    } else {
      this.authService.forgotPassword(dataToSend).then((res: any) => {
        console.log("forgot res______________", res);
        if (res['status'] == 1) {
          this.toastr.success(res['message'], 'Success');
          this.emailSent = true;
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error(res['message'], 'Error');
        }
      });
    }
  }

  resetPassword(data: any) {
    this.spinner.show();
    if (this.newPassword != this.confirmPassword) {
      this.toastr.error('Please vaidate all the fields.', 'Error');
      this.spinner.hide();
    } else {
      let dataToSend = {
        code: this.validationCode,
        password: this.newPassword
      }
      this.authService.resetPassword(dataToSend).then((res: any) => {
        console.log("reset res______________", res);
        if (res['status'] == 200) {
          this.toastr.success(res['message'], 'Success');
          this.router.navigate(['/login']);
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error(res['message'], 'Error');
        }
      });
    }
  }

}
