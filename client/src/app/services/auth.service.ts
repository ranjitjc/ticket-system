import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, HttpModule } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { CurrentUser, Ticket } from '../model/models'

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private _http: Http) {
        this.baseUrl = environment.apiURL + 'account';
        this.currentUser = this.getCurrentUser()
        if (this.currentUser){
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.accessToken });
            this.options = new RequestOptions({ headers: headers });
        }
        this._loggedInUser = <BehaviorSubject<CurrentUser>>new BehaviorSubject({});
        this.LoggedInUser = this._loggedInUser.asObservable();
    }

    baseUrl:string;
    currentUser: CurrentUser;
    options:RequestOptions;
    LoggedInUser: Observable<CurrentUser>;
    _loggedInUser: BehaviorSubject<CurrentUser>

    // loginWin(event, username, password) {
    //     event.preventDefault();

    //     let url = environment.apiURL + "login";

    //     let body = "username=" + username + "&password=" + password + "&grant_type=password";
    //     let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //     let options = new RequestOptions({ headers: headers });

    //     this._http.post(url, body, options).subscribe(
    //         response => {
    //             localStorage.setItem('access_token', response.json().access_token);
    //             localStorage.setItem('expires_in', response.json().expires_in);
    //             localStorage.setItem('token_type', response.json().token_type);
    //             localStorage.setItem('userName', response.json().userName);
    //             //this._router.navigate(['Dashboard']);
    //         },
    //         error => {
    //             alert(error.text());
    //             console.log(error.text());
    //         }
    //     );
    // }

    login(): Observable<CurrentUser> {

        // return false to indicate failed login
        localStorage.removeItem('currentUser');
        /*
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });       
        return this._http.post(url, body, options) 
        */
        let authService = this;
        return this._http.get(this.baseUrl)
            //.toPromise()
            .map(response => this.extractUser(response))
            .catch(err=> this.handleError(err, authService));
    }

    loginForms(username: string, password: string): Observable<CurrentUser> {

        localStorage.removeItem('currentUser');

        //let body = "username=" + username + "&password=" + password ;
        let body = JSON.stringify({ userName: username, password: password });
        //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.baseUrl, body, options).delay(3000)
            .map(response => this.extractUser(response))
            .catch(this.handleError);
    }

    protected extractUser(res: Response, showprogress: boolean = true) {
        let user: CurrentUser = res.json() || {};
        // login successful if there's a jwt token in the response
        let token = user && user.accessToken;
        if (token) {

            // console.log( this._loggedInUser.observers.forEach(
            //      a => a.next(user))
            //      );

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ user }));

            this._loggedInUser.next(user);
            

            // return true to indicate successful login

        } else {
            // return false to indicate failed login
            localStorage.removeItem('currentUser');
        }
        return user;
    }

    public getCurrentUser() {
        if (localStorage.getItem('currentUser')){
        return <CurrentUser>(JSON.parse(localStorage.getItem('currentUser')).user);
        }else {
            return null;
        }
    }


    protected handleError(error: any, service:any) {
        try {
            error = JSON.parse(error._body);
        } catch (e) {
        }

        let errMessage:string;

        // if (error instanceof Response){
        //     let body = error.json() || '';
        //     let error1 = body.error || JSON.stringify(body);
        //     errMessage = `${error.status} - ${error.statusText} || '' ${error1}`; 
        // }else{
        //     errMessage = error.message ? error.message : error.toString();
        // }

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
        service._loggedInUser.error( new Error(errMessage ? errMessage : errMsg));
        return Observable.throw(errMessage ? errMessage : errMsg);
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

        //delete localStorage.currentUser;

        localStorage.clear;
    }
}