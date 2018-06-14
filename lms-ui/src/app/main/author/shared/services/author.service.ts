import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { httpResultObject } from '../../../../shared/httpResultObject';
import { AuthorViewModel } from '../AuthorViewModel';

@Injectable()
export class AuthorService {
    constructor(private http: Http, private location: Location) {
    }

    getAllAuthores(): Observable<any[]> {
        return this.http.get(this.location.prepareExternalUrl("api/author"))
            .map(this.extractData);
    }

    addAuthor(author): Observable<httpResultObject<any>> {
        return this.http.post(this.location.prepareExternalUrl("api/author"), JSON.stringify(author))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    editAuthor(author:AuthorViewModel): Observable<httpResultObject<any>> {        
        return this.http.put(this.location.prepareExternalUrl("api/author/"+author.id), JSON.stringify(author))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    deleteAuthor(author:AuthorViewModel): Observable<httpResultObject<any>> {            
        return this.http.delete(this.location.prepareExternalUrl("api/author/"+author.id))
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
