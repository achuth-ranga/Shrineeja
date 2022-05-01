import { Injectable } from '@angular/core';
import { Observable, from, map, of, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VEHICLES } from './models/vehicles';
import { BUSINESS_TYPES, CLIENT_NAMES, DRIVERS_NAMES, VEHICLE_TYPES } from './models/mis-data';

@Injectable({
  providedIn: 'root'
})
export class MisMatserDataService {

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

  // filterRegnos(regno: string): Observable<any[]>{
  //   return of(VEHICLES)
  //   .pipe(map((results:any) => {
  //     return results.filter((r:any) => r.regno.toLowerCase().indexOf(regno.toLowerCase()) >= 0))
  //   });
  // }

  getVehicleTypes(): Observable<string[]> {
    return of(VEHICLE_TYPES)
  }

  filterDrivers(name: string): Observable<any[]> {
    return of(DRIVERS_NAMES)
      .pipe(map((names: any) => {
        let x: any = names.filter((n: any) => n.toLowerCase().indexOf(name.toLowerCase()) >= 0);
        console.log(x);
        return x;
      }))
  }

  getBusinessTypes(): Observable<string[]> {
    return of(BUSINESS_TYPES)
  }

  getClientNames(): Observable<string[]> {
    return of(CLIENT_NAMES)
  }
}
