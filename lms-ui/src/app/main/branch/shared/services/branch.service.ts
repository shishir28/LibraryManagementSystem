import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { httpResultObject } from '../../../../shared/httpResultObject';
import { BranchViewModel } from '../BranchViewModel';

@Injectable()
export class BranchService {
    constructor(private http: Http, private location: Location) {
    }

    getAllBranches(): Observable<any[]> {
        return this.http.get(this.location.prepareExternalUrl("api/branch"))
            .map(this.extractData);
    }

    addBranch(branch): Observable<httpResultObject<any>> {
        return this.http.post(this.location.prepareExternalUrl("api/branch"), JSON.stringify(branch))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    editBranch(branch:BranchViewModel): Observable<httpResultObject<any>> {        
        return this.http.put(this.location.prepareExternalUrl("api/branch/"+branch.id), JSON.stringify(branch))
            .map(res => {
                let result = new httpResultObject<any>();
                result.statusCode = res.status;
                result.responseBody = res.json() ;
                return result;
            });
    }

    deleteBranch(branch:BranchViewModel): Observable<httpResultObject<any>> {            
        return this.http.delete(this.location.prepareExternalUrl("api/branch/"+branch.id))
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
