import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../core/common/list/list.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';

import { BookService } from './shared/services/book.service'

import { BookListComponent } from './bookList.component';
import { NewBookComponent } from './new-book.component';


export const bookConfig: NgModule = {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    // Core
    ListModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [BookListComponent,NewBookComponent],
  exports: [BookListComponent,NewBookComponent],
  entryComponents: [NewBookComponent],

  providers: [
    BookService
  ]
}

