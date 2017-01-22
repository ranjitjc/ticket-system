import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, HttpModule} from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';


@Injectable()
export class AuthenticationService {
    constructor(private _http: Http) { 
        this._loggedInUser = <BehaviorSubject<CurrentUser>> new BehaviorSubject({});
        this.LoggedInUser = this._loggedInUser.asObservable();
    }

    LoggedInUser : Observable<CurrentUser>;
     _loggedInUser : BehaviorSubject<CurrentUser>

    loginWin(event, username, password) {
        event.preventDefault();

        let url =  environment.apiURL + "login";

        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });        
         
        this._http.post(url, body, options).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);
                //this._router.navigate(['Dashboard']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }    

    //login(username: string, password: string): Promise<CurrentUser> {
    login(): Observable<CurrentUser> {

        let url =  environment.apiURL + "account";

        // return false to indicate failed login
            localStorage.removeItem('currentUser');
        /*
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });       
        return this._http.post(url, body, options) 
        */
        return this._http.get(url) 
            //.toPromise()
            .map(response => this.extractArray(response))
            .catch(this.handleError);
    }    

    loginFormAuth(username: string, password: string): Promise<CurrentUser> {

        let url =  environment.apiURL + "/security";
        
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });       
        return this._http.post(url, body, options) 
            .toPromise()
            .then(response => this.extractArray(response))
            .catch(this.handleErrorPromise);
    } 

    protected extractArray(res: Response, showprogress: boolean = true) {
        let user : CurrentUser = res.json() || {};
        // login successful if there's a jwt token in the response
        let token = user && user.accessToken;
        if (token) {

            // console.log( this._loggedInUser.observers.forEach(
            //      a => a.next(user))
            //      );
            this._loggedInUser.next( user );
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ user }));

            // return true to indicate successful login
            
        } else {
            // return false to indicate failed login
            localStorage.removeItem('currentUser');
        }
        return user;
    }


    protected handleError(error: any) {
        try {
            error = JSON.parse(error._body);
        } catch (e) {
        }

        let errMsg = error.errorMessage
            ? error.errorMessage
            : error.message
                ? error.message
                : error._body
                    ? error._body
                    : error.status
                        ? `${error.status} - ${error.statusText}`
                        : 'unknown server error';

        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    protected handleErrorPromise(error: any): Promise<void> {
        try {
            error = JSON.parse(error._body);
        } catch (e) {
        }

        let errMsg = error.errorMessage
            ? error.errorMessage
            : error.message
                ? error.message
                : error._body
                    ? error._body
                    : error.status
                        ? `${error.status} - ${error.statusText}`
                        : 'unknown server error';

        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        //this.token = null;
        localStorage.removeItem('currentUser');
    }
}
export interface CurrentUser {
    userName :string;
    fullName: string;
    isAdmin: boolean;
    accessToken:string;
    expiresIn: Date;
    tokenType :string;
}