import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CurrentUser, AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
        AuthenticationService
    ]
})
export class LoginComponent implements OnInit {
  private title = 'Login';
  loading = false;
  model : any = {};
  error='';

  constructor(private _router: Router,  private _authenticationService: AuthenticationService) {
  }   
       
      login() {
        this.loading = true;

        this._authenticationService.loginFormAuth(this.model.username, this.model.password)
            .then(user => {
                if (user) {
                    this._router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            })
            .catch(e=>{
               this.error = 'Username or password is incorrect';
               this.loading = false;
            });
    }

  ngOnInit() {
    // reset login status
        this._authenticationService.logout();
  }

}
