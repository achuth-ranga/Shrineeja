import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AclGuard } from './secure/guards/acl.guard'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TripsComponent } from './secure/mis/trips/trips.component';
import { TripDetailsComponent } from './secure/mis/trip-details/trip-details.component';
import { AddTripdetailsComponent } from './secure/mis/add-tripdetails/add-tripdetails.component';
import { EditTripdetailsComponent } from './secure/mis/edit-tripdetails/edit-tripdetails.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
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
    path: 'tripdetails',
    component: TripDetailsComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'tripdetails/add',
    component: AddTripdetailsComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'tripdetails/edit',
    component: EditTripdetailsComponent,
    canActivate: [AclGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
