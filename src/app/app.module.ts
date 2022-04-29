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



import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule} from '@angular/material/grid-list'

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { TripsComponent } from './secure/mis/trips/trips.component';
import { TripDetailsComponent } from './secure/mis/trip-details/trip-details.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AddTripdetailsComponent } from './secure/mis/add-tripdetails/add-tripdetails.component';
import { EditTripdetailsComponent } from './secure/mis/edit-tripdetails/edit-tripdetails.component';
import { SupervisorComponent } from './secure/header/supervisor/supervisor.component';
import { AdminComponent } from './secure/header/admin/admin.component'
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './secure/mis/add-tripdetails/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    TripsComponent,
    TripDetailsComponent,
    AddTripdetailsComponent,
    EditTripdetailsComponent,
    SupervisorComponent,
    AdminComponent,
    ConfirmDialogComponent,
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
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
