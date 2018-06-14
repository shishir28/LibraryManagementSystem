import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { httpResultObject } from '../../../../shared/httpResultObject';
import { BorrowerViewModel } from '../BorrowerViewModel';

@Injectable()
export class BorrowerService {
    constructor(private http: Http, private location: Location) {
    }

    getAllBorrowers(): Observable<any[]> {
        return this.http.get(this.location.prepareExternalUrl("api/borrower"))
            .map(this.extractData);
    }

    addBorrower(borrower): Observable<httpResultObject<any>> {
        return this.http.post(this.location.prepareExternalUrl("api/borrower"), JSON.stringify(borrower))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    editBorrower(borrower:BorrowerViewModel): Observable<httpResultObject<any>> {        
        return this.http.put(this.location.prepareExternalUrl("api/borrower/"+borrower.id), JSON.stringify(borrower))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    deleteBorrower(borrower:BorrowerViewModel): Observable<httpResultObject<any>> {            
        return this.http.delete(this.location.prepareExternalUrl("api/borrower/"+borrower.id))
            .map(res => {
                let result = new httpResultObject<any>();                
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
