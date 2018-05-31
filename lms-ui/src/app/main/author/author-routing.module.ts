import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './authorList.component';


export const authorRoutes: Routes = [
  {
    path: 'authors',
    component: AuthorListComponent
  }    
];