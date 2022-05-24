import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AclGuard } from './secure/guards/acl.guard'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { TripsComponent } from './secure/mis/trips/trips.component';
import { TripDetailsComponent } from './secure/mis/trip-details/trip-details.component';
import { EditTripdetailsComponent } from './secure/mis/edit-tripdetails/edit-tripdetails.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { AuthcheckGuard } from './guards/authcheck.guard';
import { DieseladdComponent } from './secure/mis/diesel/dieseladd/dieseladd.component';
import { DieselviewComponent } from './secure/mis/diesel/dieselview/dieselview.component';
import { UserViewComponent } from './secure/user/view/view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'trips',
    component: TripsComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'trips/add',
    component: TripDetailsComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'diesel',
    component: DieselviewComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'diesel/add',
    component: DieseladdComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'supervisors',
    component: UserViewComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'drivers',
    component: UserViewComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthcheckGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
