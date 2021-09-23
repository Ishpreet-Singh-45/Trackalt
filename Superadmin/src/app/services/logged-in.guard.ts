import { Injectable } from '@angular/core';
import { CanActivate ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate
{
    constructor (
        private authService:AuthService,
        private router:Router
    )
    {}

    canActivate() {
        if(this.authService.loggedOut()) {
            return true;
        } else {
            this.router.navigate(['/dashboard']);
            return false;
        }
    }

}
