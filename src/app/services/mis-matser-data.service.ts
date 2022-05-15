import { Injectable } from '@angular/core';
import { Observable, from, map, of, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VEHICLES } from './models/vehicles';
import { BUSINESS_TYPES, CLIENT_NAMES, DRIVERS_NAMES, VEHICLE_TYPES } from './models/mis-data';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MisMatserDataService {

  private businessTypesUrl: string = environment.server_uri + "/constants/business_type";
  private clientsTypesUrl: string = environment.server_uri + "/constants/client";
  private vehicleTypesUrl: string = environment.server_uri + "/constants/vehicle_type";

  private dataQueryUrl: string = environment.server_uri + "/constants/query";
  private vehiclesUrl: string = environment.server_uri + "/vehicles/query";
  private usersUrl: string = environment.server_uri + "/users/query";


  constructor(private http: HttpClient) { }

  filterVehicles(regno: string): Observable<any[]> {
    return of(VEHICLES)
      .pipe(map((results: any) => results.filter((r: any) => r.regno.toLowerCase().indexOf(regno.toLowerCase()) >= 0)));
  }

  filterRegnos(regno: string): Observable<any[]> {
    return of(VEHICLES)
      .pipe(
        map((results: any) => results.filter((r: any) => r.regno.toLowerCase().indexOf(regno.toLowerCase()) >= 0)),
        map((results: any) => results.map((r: any) => r.regno)
        ));
  }

  getVehicleTypes(): Observable<string[]> {
    return this.http.get<any>(this.vehicleTypesUrl)
  }

  filterDrivers(name: string): Observable<any[]> {
    return of(DRIVERS_NAMES)
      .pipe(map((names: any) => names.filter((n: any) => n.toLowerCase().indexOf(name.toLowerCase()) >= 0)))
  }

  getBusinessTypes(): Observable<string[]> {
    return this.http.get<any>(this.businessTypesUrl)
  }

  getClientNames(): Observable<string[]> {
    return this.http.get<any>(this.clientsTypesUrl)
  }
}
