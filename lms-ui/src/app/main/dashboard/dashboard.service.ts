import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';


/**
 * @class DashboardService
 * This is just a demo service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */

@Injectable()
export class DashboardService {


  constructor(private http: Http) {
  }

  

  

}
