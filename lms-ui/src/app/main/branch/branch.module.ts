import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../core/common/list/list.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';

import { BranchService } from './shared/services/branch.service';

import { BranchListComponent } from './branchList.component';
import { NewBranchComponent } from './new-branch.component';
import { EditBranchComponent } from './edit-branch.component';


export const branchConfig: NgModule = {
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    // Core
    ListModule,
    PageModule,
    BreadcrumbsModule
  ],
  declarations: [BranchListComponent, NewBranchComponent, EditBranchComponent],
  exports: [BranchListComponent, NewBranchComponent, EditBranchComponent],
  entryComponents: [NewBranchComponent, EditBranchComponent],

  providers: [
    BranchService
  ]
}

