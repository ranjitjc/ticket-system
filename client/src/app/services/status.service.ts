import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class StatusService {
    constructor(private _http: Http) {
        this.baseUrl = environment.apiURL + 'ticketstatus';
     }

    baseUrl:string;

    GetAll(): Observable<TicketStatus[]> {
        return this._http.get(this.baseUrl).delay(3000)
            .map(response => this.extractArray(response))
            .catch(this.handleError);
    }    

    GetById(id: Number): Observable<TicketStatus> {

        const url = `${this.baseUrl}/${id}`;
        console.log('url' + url);
        return this._http.get(url).delay(2000)
            .map(response => this.extractArray(response))
            .catch(this.handleError);
    }  

    protected extractArray(res: Response, showprogress: boolean = true) {
        //throw "Server Error: Internal Server Error";
        let data = res.json();
        console.table(res);
        return data || [];
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
export interface TicketStatus {
    id: string;
    name: string;
    sortOrder: number;
    isDefault : number
}