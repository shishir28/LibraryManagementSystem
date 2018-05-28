import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { bookRoutes } from './demo/book/book-routing.module';
import { borrowerRoutes } from './demo/borrower/borrower-routing.module';
import { branchRoutes } from './demo/branch/branch-routing.module';
import { publisherRoutes } from './demo/publisher/publisher-routing.module';
import { authorRoutes } from './demo/author/author-routing.module';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/demo/dashboard/dashboard.module#DashboardModule',
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
