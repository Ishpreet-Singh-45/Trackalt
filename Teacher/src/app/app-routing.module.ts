import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ReportingComponent } from './reporting/reporting.component';
import { RfidLookupComponent } from './rfid-lookup/rfid-lookup.component';
import { AuthGuard } from './services/auth.guard';
import { StudentsComponent } from './students/students.component';
import { SignUpComponent } from './sign-up/sign-up.component'

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		canActivate: [AuthGuard]},
	{
		path: 'attendance',
		 component: AttendanceComponent
		},
	{
		path: 'students',
		component: StudentsComponent
	},
	{
		path: 'reporting',
		component: ReportingComponent
	},
	{
		path: 'rfid-lookup',
		component: RfidLookupComponent
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
