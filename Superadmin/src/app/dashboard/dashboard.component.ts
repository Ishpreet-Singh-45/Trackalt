import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  userName: any;
  role:any
  usersetup = false;
  constructor(private router: Router) { 
  }

  ngOnInit(): void
  {
    this.userName = localStorage.getItem("userName");
    console.log("username", this.userName)
    this.role = localStorage.getItem("role");
    console.log("username", this.userName)
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

  home() {
    this.usersetup = false;
  }

  userSetup() {
    this.usersetup = true;
  }

}
