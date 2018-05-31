import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { bookRoutes } from './book/book-routing.module';
import { borrowerRoutes } from './borrower/borrower-routing.module';
import { branchRoutes } from './branch/branch-routing.module';
import { publisherRoutes } from './publisher/publisher-routing.module';
import { authorRoutes } from './author/author-routing.module';



import { DashboardComponent } from './dashboard/dashboard.component';

export const mainRoutes: Routes = [
    ...bookRoutes,
    ...borrowerRoutes,
    ...branchRoutes,
    ...publisherRoutes,
    ...authorRoutes,
    
];
