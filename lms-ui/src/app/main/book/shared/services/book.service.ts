import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { httpResultObject } from '../../../../shared/httpResultObject';


import { Book } from '../book.model';

@Injectable()
export class BookService {
    constructor(private http: Http, private location: Location) {
    }

    getAllBooks(): Observable<Book[]> {
        return this.http.get(this.location.prepareExternalUrl("api/book"))
            .map(this.extractData);
    }

    addBook(book): Observable<httpResultObject<any>> {
        return this.http.post(this.location.prepareExternalUrl("api/book"), JSON.stringify(book))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }
    editBook(book:Book): Observable<httpResultObject<any>> {        
        return this.http.put(this.location.prepareExternalUrl("api/book/"+book.id), JSON.stringify(book))
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
