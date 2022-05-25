import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './secure/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCommonModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { TripsComponent } from './secure/mis/trips/trips.component';
import { TripDetailsComponent } from './secure/mis/trip-details/trip-details.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SupervisorComponent } from './secure/header/supervisor/supervisor.component';
import { AdminComponent } from './secure/header/admin/admin.component'
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { VehicleSearchComponent } from './secure/components/vehicle-search/vehicle-search.component';
import { GenericSelectComponent } from './secure/components/generic-select/generic-select.component';
import { GenericFilterComponent } from './secure/components/generic-filter/generic-filter.component';
import { GenericDateComponent } from './secure/components/generic-date/generic-date.component';
import { DatePipe } from '@angular/common';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DriverComponent } from './secure/header/driver/driver.component';
import { DateFilterComponent } from './secure/components/date-filter/date-filter.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DieseladdComponent } from './secure/mis/diesel/dieseladd/dieseladd.component';
import { DieselviewComponent } from './secure/mis/diesel/dieselview/dieselview.component';
import { UserViewComponent } from './secure/user/view/view.component';
import { AddUserComponent } from './secure/user/add-user/add-user.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { ChangePasswordComponent } from './secure/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    TripsComponent,
    TripDetailsComponent,
    SupervisorComponent,
    AdminComponent,
    VehicleSearchComponent,
    GenericSelectComponent,
    GenericFilterComponent,
    GenericDateComponent,
    DriverComponent,
    DateFilterComponent,
    DieseladdComponent,
    DieselviewComponent,
    UserViewComponent,
    AddUserComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    HttpClientModule,
    MatCommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTableExporterModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
