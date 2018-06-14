import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../core/common/list/list.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';

import { AuthorService } from './shared/services/author.service';

import { AuthorListComponent } from './authorList.component';
import { NewAuthorComponent } from './new-author.component';
import { EditAuthorComponent } from './edit-author.component';


export const authorConfig: NgModule = {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    // Core
    ListModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [AuthorListComponent, NewAuthorComponent, EditAuthorComponent],
  exports: [AuthorListComponent, NewAuthorComponent, EditAuthorComponent],
  entryComponents: [NewAuthorComponent, EditAuthorComponent],

  providers: [
    AuthorService
  ]
}

