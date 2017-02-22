import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, HttpModule, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { CurrentUser, Ticket } from '../model/models'

import { environment } from '../../environments/environment';

import { AuthenticationService } from './auth.service';

@Injectable()
export class TicketService {
    constructor(private _http: Http, private _authService: AuthenticationService) {
        this.baseUrl = environment.apiURL + 'ticket';

    }

    baseUrl: string;
    currentUser: CurrentUser;
    options: RequestOptions;


    GetReportedTicketsByUser(): Observable<Ticket> {

        this.currentUser = this._authService.getCurrentUser()
        if (this.currentUser) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.accessToken });
            let params = new URLSearchParams();
            params.set('ReportedUser', this.currentUser.id.toString());
            this.options = new RequestOptions({ headers: headers, search: params });

            const url = `${this.baseUrl}/ReportedTickets`;

            console.log('url' + url);
            return this._http.get(url, this.options).delay(2000)
                .map(response => this.extractArray(response))
                .catch(this.handleError);
        }
    }

    GetAssignedTicketsByUser(): Observable<Ticket> {

        this.currentUser = this._authService.getCurrentUser()
        if (this.currentUser) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.accessToken });
            this.options = new RequestOptions({ headers: headers, });

            const url = `${this.baseUrl}/AssignedTickets`;
            let params = new URLSearchParams();
            params.set('AssignedUser', this.currentUser.id.toString());

            this.options.search = params;

            console.log('url' + url);
            return this._http.get(url, this.options).delay(100)
                .map(response => this.extractArray(response))
                .catch(this.handleError);
        }
    }

    GetAllTickets(currentPage): Observable<Ticket> {

        this.currentUser = this._authService.getCurrentUser()
        if (this.currentUser) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.accessToken });
            this.options = new RequestOptions({ headers: headers, });

            const url = `${this.baseUrl}`;
            let params = new URLSearchParams();
            params.set('Page', currentPage);
            params.set('PageSize', '15');
            params.set('SortBy', 'Id');

            this.options.search = params;

            console.log('url' + url);
            return this._http.get(url, this.options).delay(100)
                .map(response => response.json())
                .catch(this.handleError);
        }
    }

    GetTicket(id:Number): Observable<Ticket> {

        this.currentUser = this._authService.getCurrentUser()
        if (this.currentUser) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.accessToken });
            this.options = new RequestOptions({ headers: headers, });

            const url = `${this.baseUrl}/${id}`;

            console.log('url' + url);
            return this._http.get(url, this.options).delay(100)
                .map(response => response.json())
                .catch(this.handleError);
        }
    }

    GetTicketsByStatus(userId, type): Observable<any> {

        this.currentUser = this._authService.getCurrentUser()
        if (this.currentUser) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.accessToken });
            this.options = new RequestOptions({ headers: headers, });

            const url = `${this.baseUrl}/ReportedTicketsByStatus`;
            let params = new URLSearchParams();
            params.set('UserId', userId);
            params.set('Type', type);

            this.options.search = params;

            console.log('url' + url);
            return this._http.get(url, this.options).delay(100)
                .map(response => response.json())
                .catch(this.handleError);
        }
    }

    protected extractArray(res: Response, showprogress: boolean = true) {
        //throw "Server Error: Internal Server Error";
        let data: Ticket[] = res.json();
        //console.table(res);
        return data || [];
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
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
}