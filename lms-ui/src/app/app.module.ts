import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import 'hammerjs'; // Needed for Touch functionality of Material Components
import { environment } from '../environments/environment';
import { httpFactory } from './shared/httpFactory';

import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { MainModule } from './main/main.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    RoutingModule,
    MainModule,

    
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],

  exports: [
  
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions],
    },
 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
