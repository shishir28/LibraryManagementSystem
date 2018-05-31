import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowerListComponent } from './borrowerList.component';


export const borrowerRoutes: Routes = [
  {
    path: 'borrowers',
    component: BorrowerListComponent
  }    
];