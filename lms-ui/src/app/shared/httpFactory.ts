import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './HttpInterceptor';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, location: Location): Http {
    return new HttpInterceptor(xhrBackend, requestOptions,location);
}
