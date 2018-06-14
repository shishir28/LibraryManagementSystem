import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { httpResultObject } from '../../../../shared/httpResultObject';
import { PublisherViewModel } from '../PublisherViewModel';

@Injectable()
export class PublisherService {
    constructor(private http: Http, private location: Location) {
    }

    getAllPublishers(): Observable<PublisherViewModel[]> {
        return this.http.get((this.location.prepareExternalUrl("api/publisher" )))
        .map(this.extractData);    
    }

    addPublisher(publisher): Observable<httpResultObject<any>> {
        return this.http.post(this.location.prepareExternalUrl("api/publisher"), JSON.stringify(publisher))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    editPublisher(publisher:PublisherViewModel): Observable<httpResultObject<any>> {        
        return this.http.put(this.location.prepareExternalUrl("api/publisher/"+publisher.id), JSON.stringify(publisher))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    deletePublisher(publisher:PublisherViewModel): Observable<httpResultObject<any>> {            
        return this.http.delete(this.location.prepareExternalUrl("api/publisher/"+publisher.id))
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
