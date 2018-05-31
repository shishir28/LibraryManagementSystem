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
import { bookConfig } from './main/book/book.module';
import { borrowerConfig } from './main/borrower/borrower.module';
import { branchConfig } from './main/branch/branch.module';
import { publisherConfig } from './main/publisher/publisher.module';
import { authorConfig } from './main/author/author.module';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';


@NgModule({
  declarations: [AppComponent,
    ...bookConfig.declarations,
    ...borrowerConfig.declarations,
    ...branchConfig.declarations,
    ...publisherConfig.declarations,
    ...authorConfig.declarations,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    RoutingModule,
    ...bookConfig.imports,
    ...borrowerConfig.imports,
    ...publisherConfig.imports,
    ...authorConfig.imports,
    
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],

  exports: [
    ...bookConfig.exports,
    ...borrowerConfig.exports,
    ...branchConfig.exports,
    ...publisherConfig.exports,
    ...authorConfig.exports,
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions],
    },
    ...bookConfig.providers,
    ...borrowerConfig.providers,
    ...branchConfig.providers,   
    ...publisherConfig.providers,
    ...authorConfig.providers,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
