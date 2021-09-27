import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService
{
	authToken: any;
	token: any;
	baseUrl = environment.test;
	// headers1 = { headers: { Authorization: "Bearer " + this.token } };

	constructor(
		private http: HttpClient
	)
	{}

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


	signUp(data: any)
	{
		return this.http
		.post(this.baseUrl + "user/signup", data)
		.toPromise()
		.then(res => res)
	}


	storeUserData(token: string)
	{
		localStorage.setItem("id_token", token);
		this.authToken = token;
	}


	getStudentAttendance(data: any)
	{
		return this.http.post(this.baseUrl + 'admin/attendanceByClassGrade', data)
		.toPromise()
		.then(res => res)
	}

 
	loadToken()
	{
		const token = localStorage.getItem("id_token");
		this.authToken = token;
		return localStorage.getItem("id_token");
	}


	loggedIn() {
		return this.loadToken() !== null;
	}


	logout() {
		this.authToken = null;
		localStorage.clear();
	}
}
