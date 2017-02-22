import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthType, environment } from '../../environments/environment';

import { AuthenticationService  } from '../services/services.module';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
    private _authenticationService: AuthenticationService) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        if (environment.authType == AuthType.FORMS){
            this.router.navigate(['login']);
            return false;
        }else{
            this._authenticationService.login().subscribe();
            return true;
        }
        
    }
}