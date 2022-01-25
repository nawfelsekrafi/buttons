import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages';
import { AuthGuard } from '../core/guards';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ROUTE_DASHBOARD, ROUTE_HOME } from '../routes';

const routes: Routes = [
  {
    path: ROUTE_HOME,
    component: HomePage,
  },
  {
    path: ROUTE_DASHBOARD,
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
