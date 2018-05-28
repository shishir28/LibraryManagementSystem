import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherListComponent } from './publisherList.component';


export const publisherRoutes: Routes = [
  {
    path: 'publishers',
    component: PublisherListComponent
  }    
];