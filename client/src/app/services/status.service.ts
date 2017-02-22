import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

import {CurrentUser, TicketStatus} from '../model/models'

import {AuthenticationService } from './auth.service';

@Injectable()
export class StatusService {
    constructor(private _http: Http,private _authService: AuthenticationService) {
        this.baseUrl = environment.apiURL + 'ticketstatus';
        this.currentUser = this._authService.getCurrentUser()
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.currentUser.accessToken });
        this.options = new RequestOptions({ headers: headers });
     }

    baseUrl:string;
    currentUser: CurrentUser;
    options:RequestOptions;
    GetAll(): Observable<TicketStatus[]> {
      // add authorization header with jwt token
        

        return this._http.get(this.baseUrl, this.options).delay(0)
            .map(response => this.extractArray(response))
            //.do(data => console.log('GetAll: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }    

    GetById(id: Number): Observable<TicketStatus> {

        const url = `${this.baseUrl}/${id}`;
        console.log('url' + url);
        return this._http.get(url, this.options).delay(2000)
            .map(response => this.extractArray(response))
            .catch(this.handleError);
    }  

    
    save(ticketStatus: TicketStatus): Observable<TicketStatus> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        if (ticketStatus.id == 0) {
            return this.createStatus(ticketStatus, this.options);
        }
        return this.updateStatus(ticketStatus, this.options);
    }

    private createStatus(ticketStatus: TicketStatus, options: RequestOptions): Observable<TicketStatus> {
        //ticketStatus.id = undefined;
        //return this._http.post(this.baseUrl, ticketStatus, options)
        
        return this._http.post(this.baseUrl, ticketStatus, options)
            .map(this.extractData).delay(3000)
            .do(data => console.log('createStatus: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateStatus(ticketStatus: TicketStatus, options: RequestOptions): Observable<TicketStatus> {
        const url = `${this.baseUrl}`; ///${ticketStatus.id}`;
        return this._http.put(url, ticketStatus, options).delay(3000)
            .map(() => ticketStatus)
            .do(data => console.log('updateStatus: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

      delete(id: number): Observable<Response> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this._http.delete(url, this.options).delay(3000)
            .do(data => console.log('deleteStatus: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    protected extractArray(res: Response, showprogress: boolean = true) {
        //throw "Server Error: Internal Server Error";
        let data = res.json();
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

        let errMessage:string;

        if (error instanceof Response){
            let body = error.json() || '';
            let error1 = body.error || JSON.stringify(body);
            errMessage = `${error.status} - ${error.statusText} || '' ${error1}`; 
        }else{
            errMessage = error.message ? error.message : error.toString();
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
        return Observable.throw(errMessage ? errMessage : errMsg);
    }
}
