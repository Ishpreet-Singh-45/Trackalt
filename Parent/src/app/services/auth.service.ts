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

	constructor(private http: HttpClient)
	{ }

	async login(data: any)
	{
		// send the request to backend api with appropriate data
		const res = await this.http
			.post(this.baseUrl + "user/login", data)
			.toPromise();
		return res;
	}

	async forgotPassword(data: any)
	{
		// send the request to backend api with appropriate data
		const res = await this.http
			.post(this.baseUrl + "user/forget-password", data)
			.toPromise();
		return res;
	}

	async signUp(data: any)
	{
		// send the request to backend api with appropriate data
		return await this.http
			.post(this.baseUrl + "user/signup", data)
			.toPromise()
			.then(res => res);
	}

	async completeUserProfile(data: any, userId: any)
	{
		// set the headers
		// send the request to backend api with appropriate data to save user
		let headers: any = { headers: { Authorization: localStorage.getItem("id_token") } };
		return await this.http
			.put(this.baseUrl + "user/update-user/" + userId, data, headers)
			.toPromise()
			.then(res => res);
	}
	async getAttInfo(name: string)
	{
		let data = {
			rfid: name
		}
		return await this.http
		.post(this.baseUrl + "admin/student-attendance/", data)
		.toPromise()
		.then(res => res)
	}

	// Password Reset
	async resetPassword(data: any)
	{
		// send request to backend api
		const res = await this.http
			.post(this.baseUrl + "user/reset-password", data)
			.toPromise();
			return res;
	}

	// storing <token> to localStorage
	storeUserData(token: string)
	{
		localStorage.setItem("id_token", token);
		this.authToken = token;
	}


	// set the auth token into Local Storage
	loadToken()
	{
		const token = localStorage.getItem("id_token");
		this.authToken = token;
		return localStorage.getItem("id_token");
	}


	// used in auth guard to check if user is logged in
	loggedIn()
	{
		// return boolean if <id_token> is not found
		return this.loadToken() !== null;
	}

	// Logout user
	logout()
	{
		this.authToken = null;
		localStorage.clear();
	}


}
