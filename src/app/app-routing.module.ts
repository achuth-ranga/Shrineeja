import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AclGuard } from './secure/guards/acl.guard'
import { LoginComponent } from './login/login.component';
import { TripsComponent } from './secure/mis/trips/trips.component';
import { TripDetailsComponent } from './secure/mis/trip-details/trip-details.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { AuthcheckGuard } from './guards/authcheck.guard';
import { DieseladdComponent } from './secure/mis/diesel/dieseladd/dieseladd.component';
import { DieselviewComponent } from './secure/mis/diesel/dieselview/dieselview.component';
import { UserViewComponent } from './secure/user/view/view.component';
import { AddUserComponent } from './secure/user/add-user/add-user.component';
import { ChangePasswordComponent } from './secure/change-password/change-password.component';
import { AdminOnlyGuard } from './secure/guards/admin-only.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full'
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AclGuard]
  // },
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
    path: 'supervisors/add',
    component: AddUserComponent,
    canActivate: [AdminOnlyGuard]
  },
  {
    path: 'drivers/add',
    component: AddUserComponent,
    canActivate: [AdminOnlyGuard]
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
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
