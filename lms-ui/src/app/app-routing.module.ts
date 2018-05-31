import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { bookRoutes } from './main/book/book-routing.module';
import { borrowerRoutes } from './main/borrower/borrower-routing.module';
import { branchRoutes } from './main/branch/branch-routing.module';
import { publisherRoutes } from './main/publisher/publisher-routing.module';
import { authorRoutes } from './main/author/author-routing.module';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/main/dashboard/dashboard.module#DashboardModule',
        pathMatch: 'full'
      },
      ...bookRoutes,
      ...borrowerRoutes,
      ...branchRoutes,
      ...publisherRoutes,
      ...authorRoutes,
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
