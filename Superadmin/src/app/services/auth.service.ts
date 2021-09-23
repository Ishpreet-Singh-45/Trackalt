import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
	authToken: any;
	token: any;
	baseUrl = environment.test;

	constructor(
		private http: HttpClient
	)
	{ }

	login(data: any)
	{
		return this.http
		.post(this.baseUrl + "user/login", data)
		.toPromise()
		.then(res => res);
	}

	forgotPassword(data: any)
	{
		return this.http
			.post(this.baseUrl + "user/forget-password", data)
			.toPromise()
			.then(res => res);
	}

	resetPassword(data: any)
	{
		return this.http
			.post(this.baseUrl + "user/reset-password", data)
			.toPromise()
			.then(res => res);
	}

	// Get All District Information
	getDistrict(data: any)
	{
		let headers: any = { params: data, headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
		.get(this.baseUrl + "super-admin/district", headers)
		.toPromise()
		.then(res => res);
	}

	getAllDistrict()
	{
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
		.get(this.baseUrl + "super-admin/district", headers)
		.toPromise()
		.then(res => res);
	}

	addDistrict(data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "super-admin/add-district", data, headers).toPromise().then(res => res);
	}

	editDistrict(id: any, data: any)
	{
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
		.put(this.baseUrl + "super-admin/update-district/" + id, data, headers)
		.toPromise()
		.then(res => res);
	}

	deleteDistrict(id: any, data: any)
	{
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "super-admin/update-district/" + id, data, headers)
			.toPromise()
			.then(res => res);
	}
	// District Information Ends


	search(data?: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "cases/cases-list", data, headers)
			.toPromise()
			.then(res => res);
	}



	// School Information ends
	getSchool() {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.get(this.baseUrl + "super-admin/school", headers).toPromise().then(res => res);
	}

	addSchool(data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "super-admin/add-school", data, headers).toPromise().then(res => res);
	}

	editSchool(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "super-admin/update-school/" + id, data, headers).toPromise().then(res => res);
	}

	deleteSchool(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "super-admin/update-school/" + id, data, headers).toPromise().then(res => res);
	}
	// School Information ends


	// Admin Information
	getAdmins(data: any) {
		let headers: any = { params: data, headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.get(this.baseUrl + "super-admin/admin-list", headers).toPromise().then(res => res);
	}

	addAdmin(data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "super-admin/add-admin", data, headers).toPromise().then(res => res);
	}

	editAdmin(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "super-admin/update-admin/" + id, data, headers).toPromise().then(res => res);
	}

	deleteAdmin(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "super-admin/update-admin/" + id, data, headers).toPromise().then(res => res);
	}
	// Admin Information ends




	storeUserData(token: string) {
		localStorage.setItem("id_token", token);
		this.authToken = token;
	}



	// Teacher Information
	getTeachers() {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.get(this.baseUrl + "admin/teacher", headers).toPromise().then(res => res);
	}

	addTeacher(data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "admin/add-teacher", data, headers).toPromise().then(res => res);
	}

	editTeacher(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-teacher/" + id, data, headers).toPromise().then(res => res);
	}

	deleteTeacher(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-teacher/" + id, data, headers).toPromise().then(res => res);
	}
	// Teacher Information ends


	// Student Information
	getStudents() {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.get(this.baseUrl + "admin/student", headers).toPromise().then(res => res);
	}

	addStudent(data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "admin/add-student", data, headers).toPromise().then(res => res);
	}

	editStudent(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-student/" + id, data, headers).toPromise().then(res => res);
	}

	deleteStudent(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-student/" + id, data, headers).toPromise().then(res => res);
	}
	// Student Information ends




	// District Calendar
	getDistrictCalendar() {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.get(this.baseUrl + "admin/calendar", headers).toPromise().then(res => res);
	}

	addDistrictCalendar(data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "admin/add-calendar", data, headers).toPromise().then(res => res);
	}

	editDistrictCalendar(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-calendar" + id, data, headers).toPromise().then(res => res);
	}

	deleteDistrictCalendar(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-calendar" + id, data, headers).toPromise().then(res => res);
	}
	// District Calendar ends


	// Holiday
	getHolidayCalendar() {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.get(this.baseUrl + "admin/holiday", headers).toPromise().then(res => res);
	}

	addHolidayCalendar(data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.post(this.baseUrl + "admin/add-holiday", data, headers).toPromise().then(res => res);
	}

	editHolidayCalendar(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-holiday" + id, data, headers).toPromise().then(res => res);
	}

	deleteHolidayCalendar(id: any, data: any) {
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return this.http
			.put(this.baseUrl + "admin/update-holiday" + id, data, headers).toPromise().then(res => res);
	}
	// Holiday ends




	loadToken()
	{
		const token = localStorage.getItem("id_token");
		this.authToken = token;
		return localStorage.getItem("id_token");
	}

	loggedIn()
	{
		console.log('Id_toknen not null: ', this.loadToken() !== null);
		return this.loadToken() !== null;
	}

	// isloggedOut(){
	//   return localStorage.getItem("username")
	//   }
	loggedOut()
	{
		console.log(this.loadToken() !== null);
		return this.loadToken() == null;
	}

	logout()
	{
		this.authToken = null;
		localStorage.clear();
	}
}
