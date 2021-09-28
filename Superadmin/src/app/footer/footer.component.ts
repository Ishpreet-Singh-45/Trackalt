import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userName:any
  role:any
  userLogged:any
  constructor(private router: Router) {
   }

  ngOnInit(): void 
  {
    this.userName = localStorage.getItem("userName");
    this.role = localStorage.getItem("role");
  }
 
  logout() 
  {
    localStorage.clear();
    this.router.navigate(['/login']);
    location.reload()
    return false;
  }
}
