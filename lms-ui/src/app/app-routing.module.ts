import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// ---------Routes----------
import { mainRoutes } from './main/main-routing.module';
//-------------

import { LayoutComponent } from './core/layout/layout.component';


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
      ...mainRoutes,
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
