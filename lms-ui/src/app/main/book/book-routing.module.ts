import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './bookList.component';


export const bookRoutes: Routes = [
  {
    path: 'books',
    component: BookListComponent
  }    
];