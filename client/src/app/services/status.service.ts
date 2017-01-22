import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
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
            .do(data => console.log('GetAll: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }    

    GetById(id: Number): Observable<TicketStatus> {

        const url = `${this.baseUrl}/${id}`;
        console.log('url' + url);
        return this._http.get(url).delay(2000)
            .map(response => this.extractArray(response))
            .catch(this.handleError);
    }  

    
    save(ticketStatus: TicketStatus): Observable<TicketStatus> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (ticketStatus.id == 0) {
            return this.createProduct(ticketStatus, options);
        }
        return this.updateProduct(ticketStatus, options);
    }

    private createProduct(ticketStatus: TicketStatus, options: RequestOptions): Observable<TicketStatus> {
        //ticketStatus.id = undefined;
        return this._http.post(this.baseUrl, ticketStatus, options)
            .map(this.extractData)
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProduct(ticketStatus: TicketStatus, options: RequestOptions): Observable<TicketStatus> {
        const url = `${this.baseUrl}/${ticketStatus.id}`;
        return this._http.put(url, ticketStatus, options)
            .map(() => ticketStatus)
            .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
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
    id: Number;
    name: string;
    sortOrder: number;
    isDefault : number
}