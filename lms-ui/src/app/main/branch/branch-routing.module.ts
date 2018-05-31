import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './branchList.component';


export const branchRoutes: Routes = [
  {
    path: 'branches',
    component: BranchListComponent
  }    
];