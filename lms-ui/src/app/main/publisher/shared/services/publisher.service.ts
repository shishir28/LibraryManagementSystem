import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PublisherViewModel } from '../publisherViewModel';

@Injectable()
export class PublisherService {
    constructor(private http: Http, private location: Location) {
    }

    getAllPublisheres(): Observable<PublisherViewModel[]> {
        return this.http.get((this.location.prepareExternalUrl("api/publisher" )))
        .map(this.extractData);    
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
