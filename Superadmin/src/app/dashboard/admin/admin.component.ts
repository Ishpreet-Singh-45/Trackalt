import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
declare let $: any;

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit
{
	adminList: any;
	adminListing = true;	// opening/closing the new admin SPA modal
	editAdminBtn = false;	// edit admin submit button
	adminId: any;
	email: any;
	password: any;
	firstName: any;
	lastName: any;
	middleName: any;
	mailingAddress: any;
	mailingCity: any;
	mailingState: any;
	mailingZip: any;
	phoneNumber: any;
	countryCode: any;
	imageUrl: any;
	physicalDistrict: any;
	district: any;
	schoolName: any;
	editDistrict: any;
	addEditDistrictCalendar: any;
	addEditSchoolCalendar: any;
	addEditTeacher: any;
	addEditStudent: any;
	userName: any;
	searchText: any;
	role:any
	districtList: any;

	constructor(
		private router: Router,
		private authService: AuthService,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService
	)
	{ }

	ngOnInit(): void
	{
		this.getAdmins();
		this.userName = localStorage.getItem("userName");
		this.role = localStorage.getItem("role");
		this.getDistrict()
	}

	getAdmins()
	{
		this.searchText = ""
		this.spinner.show();
		let dataToSend = {
			search: this.searchText
		}
		this.authService.getAdmins(dataToSend).then((res: any) => {
			console.log("res__________", res);
			this.adminList = res['data'];
			this.spinner.hide();
			console.log("admin list___________", this.adminList);
		});
	}

	editAdminData(data: any)
	{
		console.log(data);
		this.editAdminBtn = true;
		console.log('editAdminBtn: ', this.editAdminBtn)
		this.adminId = data._id;
		this.email = data.email;
		this.password = data.password;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.middleName = data.middleName;
		this.mailingAddress = data.mailingAddress;
		this.mailingCity = data.mailingCity;
		this.physicalDistrict = data.mailingState;
		this.mailingZip = data.mailingZip;
		this.phoneNumber = data.phoneNumber;
		this.countryCode = data.countryCode;
		this.imageUrl = data.imageUrl;
		this.schoolName = data.schoolName;
		this.editDistrict = data.editDistrict;
		this.addEditDistrictCalendar = data.addEditDistrictCalendar;
		this.addEditSchoolCalendar = data.addEditSchoolCalendar;
		this.addEditTeacher = data.addEditTeacher;
		this.addEditStudent = data.addEditStudent;
		// this.adminListing = false;

		$('#editAdminModal').modal('show')
	}

	// get all district names for dropwdown in add modal
	getDistrict()
  	{
  		this.spinner.show();
	    this.authService.getAllDistrict().then( (res: any) =>
	    {
	    	this.districtList = res['data'];
	    	this.spinner.hide();
	    	console.log("school list___________", this.districtList);
	    });
	}

	editAdmin()
	{
		this.spinner.show();
		let dataToSend =
		{
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			middleName: this.middleName,
			mailingAddress: this.mailingAddress,
			mailingCity: this.mailingCity,
			mailingState: this.physicalDistrict,
			mailingZip: this.mailingZip,
			phoneNumber: this.phoneNumber,
			countryCode: this.countryCode,
			imageUrl: this.imageUrl,
			schoolName: this.schoolName,
			editDistrict: this.editDistrict,
			addEditDistrictCalendar: this.addEditDistrictCalendar,
			addEditSchoolCalendar: this.addEditSchoolCalendar,
			addEditTeacher: this.addEditTeacher,
			addEditStudent: this.addEditStudent,
		}

		this.authService.editAdmin(this.adminId, dataToSend).then((res: any) =>
		{
			console.log("edit admin res", res);
			if (res['status'] == 200)
			{
				this.toastr.success(res['message'], 'Success');
				this.adminListing = true;
				this.getAdmins();
				$('#editAdminModal').modal('hide')
				this.spinner.hide();
			} else
			{
				this.toastr.error(res['message'], 'Error');
				this.spinner.hide();
			}
		});
	}

	backToList()
	{
		this.adminListing = true;
	}

	deleteAdminData(data: any)
	{
		// delete admin based on unique id parameter from mongoose
		this.adminId = data._id;
		$('#deleteAdminModal').modal('show');
	}

	deleteAdmin()
	{
		this.spinner.show();
		let dataToSend = {
			isDeleted: true
		}
		this.authService.deleteAdmin(this.adminId, dataToSend).then((res: any) => {
			console.log("delete admin res", res);
			if (res['status'] == 200) {
				this.toastr.success(res['message'], 'Success');
				$('#deleteAdminModal').modal('hide');
				this.getAdmins();
				this.spinner.hide();
			} else {
				this.toastr.error(res['message'], 'Error');
				this.spinner.hide();
			}
		});
	}

	cancelDelete()
	{
		// simply hide the modal
		$('#deleteAdminModal').modal('hide');
	}

	// opens the modal to add new admin
	openAddModal()
	{
		console.log("open");
		this.adminId = "";
		this.email = "";
		this.password = "";
		this.firstName = "";
		this.lastName = "";
		this.middleName = "";
		this.mailingAddress = "";
		this.mailingCity = "";
		this.mailingState = "";
		this.mailingZip = "";
		this.phoneNumber = "";
		this.countryCode = "";
		this.imageUrl = "";
		this.physicalDistrict = "";
		this.schoolName = "";
		this.editDistrict = "";
		this.addEditDistrictCalendar = "";
		this.addEditSchoolCalendar = "";
		this.addEditTeacher = "";
		this.addEditStudent = "";
		this.adminListing = false;
	}
	openAddDiv()
	{
		console.log("open");
		this.adminId = "";
		this.email = "";
		this.password = "";
		this.firstName = "";
		this.lastName = "";
		this.middleName = "";
		this.mailingAddress = "";
		this.mailingCity = "";
		this.mailingState = "";
		this.mailingZip = "";
		this.phoneNumber = "";
		this.countryCode = "";
		this.imageUrl = "";
		this.physicalDistrict = "";
		this.schoolName = "";
		this.editDistrict = "";
		this.addEditDistrictCalendar = "";
		this.addEditSchoolCalendar = "";
		this.addEditTeacher = "";
		this.addEditStudent = "";
		$('#addAdminModal').modal('show');
	}

	addAdmin()
	{
		this.spinner.show();

		// collect the data
		let dataToSend =
		{
			email: this.email,
			password: this.password,
			firstName: this.firstName,
			lastName: this.lastName,
			middleName: this.middleName,
			mailingAddress: this.mailingAddress,
			mailingCity: this.mailingCity,
			mailingState: this.physicalDistrict,
			mailingZip: this.mailingZip,
			phoneNumber: this.phoneNumber,
			countryCode: this.countryCode,
			imageUrl: this.imageUrl,
			district: this.physicalDistrict,
			schoolName: this.schoolName,
			editDistrict: this.editDistrict,
			addEditDistrictCalendar: this.addEditDistrictCalendar,
			addEditSchoolCalendar: this.addEditSchoolCalendar,
			addEditTeacher: this.addEditTeacher,
			addEditStudent: this.addEditStudent,
		}
		// send the data and respond to response
		this.authService.addAdmin(dataToSend).then( (res: any) =>
		{
			console.log("add admin res", res);

			if (res['status'] == 200)
			{
				this.toastr.success(res['message'], 'Success');
				this.adminListing = true;
				this.getAdmins();	// show the added admin in list now
				$('#addAdminModal').modal('hide');
				this.spinner.hide();
			} else
			{
				this.toastr.error(res['message'], 'Error');
				this.spinner.hide();
			}
		});
	}

	cancelAdd()
	{
		this.adminListing = true;
		this.getAdmins();
	}

	cancelEdit()
	{
		$('#editAdminModal').modal('hide');
	}

	logout()
	{
		localStorage.clear();
		this.router.navigate(['/login']);
		return false;
	}

	home()
	{
		this.router.navigate(['/dashboard'])
	}


	search()
	{
		let dataToSend =
		{
			search: this.searchText
		}
		console.log("data to  search", this.searchText);
		this.authService.getAdmins(dataToSend).then((res: any) =>
		{
			this.adminList = res["data"];
			console.log("admin___________>>>>>_", res);
		});
	}

}

