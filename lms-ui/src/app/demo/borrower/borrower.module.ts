import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../core/common/list/list.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';

import { BorrowerService } from './shared/services/borrower.service';

import { BorrowerListComponent } from './borrowerList.component';

export const borrowerConfig: NgModule = {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    // Core
    ListModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [BorrowerListComponent],
  exports: [BorrowerListComponent],
  providers: [
    BorrowerService
  ]
}

