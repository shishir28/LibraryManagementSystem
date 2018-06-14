import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../core/common/list/list.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';

import { PublisherService } from './shared/services/publisher.service';

import { PublisherListComponent } from './publisherList.component';
import { NewPublisherComponent } from './new-publisher.component';
import { EditPublisherComponent } from './edit-publisher.component';


export const publisherConfig: NgModule = {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    // Core
    ListModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [PublisherListComponent, NewPublisherComponent, EditPublisherComponent],
  exports: [PublisherListComponent, NewPublisherComponent, EditPublisherComponent],
  entryComponents: [NewPublisherComponent, EditPublisherComponent],

  providers: [
    PublisherService
  ]
}

