import { Injectable } from '@angular/core';
import { Observable, from, map, of, filter, combineLatest, forkJoin, combineLatestWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VEHICLES } from './models/vehicles';
import { BUSINESS_TYPES, CLIENT_NAMES, DRIVERS_NAMES, VEHICLE_TYPES } from './models/mis-data';
import { environment } from 'src/environments/environment';
import { TableColumn } from './models/table-column';
import { TripColumnType } from './enums/trip-column-type';
@Injectable({
  providedIn: 'root'
})
export class MisMatserDataService {

  private businessTypesUrl: string = environment.server_uri + "/constants/business_type";
  private clientsTypesUrl: string = environment.server_uri + "/constants/client";
  private vehicleTypesUrl: string = environment.server_uri + "/constants/vehicle_type";

  private dataQueryUrl: string = environment.server_uri + "/constants/query";
  private vehiclesUrl: string = environment.server_uri + "/vehicles";
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

  fetchRegnosLike(regno: string): Observable<any[]> {
    let params: any = {
      'regnolike': regno
    };
    return this.http.get<any>(environment.server_uri + "/vehicles", { 'params': params })
      .pipe(
        map((results: any) => results.map((r: any) => { return { "name": r.regno, 'id': r.id } })
        ));
  }

  fetchAllRegnos(): Observable<any> {
    let params: any = {
      'regnolike': ''
    };
    return this.http.get<any>(environment.server_uri + "/vehicles", { 'params': params })
      .pipe(
        map((results: any) => {
          let mapped = results.map((r: any) => { return { "name": r.regno, 'id': r.id } });
          let json: any = { "data": mapped };
          return json;
        }));
  }

  fetchDrivers(): Observable<any[]> {
    let query: any = {
      "userTypes": ["driver"]
    }
    return this.http.post<any[]>(environment.server_uri + "/users/query", query, {})
      .pipe(
        map((results: any) => {
          let data: any[] = [];
          results.payload.forEach((driver: any) => {
            let converted: any = { "name": driver.lastName + " " + driver.firstName, "id": driver.id }
            data.push(converted);
          })
          let result: any = { 'data': data }
          return result;
        }
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

  /***
   * This method will call the 
   */
  updateIds(data: any[], columns: TableColumn[], callback: any, instance: any) {
    let types: string[] = columns.map((col) => col.type)
    let observables: any[] = [];

    let vehicles: Observable<any>;
    let drivers: Observable<any>;
    if (types.includes(TripColumnType.DRIVER)) {
      drivers = this.fetchDrivers();
      observables.push(drivers);
    } else {
      drivers = of({ "data": [] })
    }
    if (types.includes(TripColumnType.REGNO_SEARCH)) {
      vehicles = this.fetchAllRegnos();
      observables.push(vehicles);
    } else {
      vehicles = of({ "data": [] })
    }

    vehicles.pipe(combineLatestWith(drivers))
      .subscribe(([regnos, drivers]) => {
        let regnosMap: any = {};
        let driversMap: any = {};
        regnos.data.forEach((r: any) => regnosMap[r.name] = r.id);
        drivers.data.forEach((r: any) => driversMap[r.name] = r.id);

        let regnoKey: string = "regno";
        let driverKey: string = "driver";

        data.forEach((d: any) => {
          if (d.hasOwnProperty(regnoKey) && regnosMap.hasOwnProperty(d[regnoKey])) {
            d[regnoKey + "Id"] = regnosMap[d[regnoKey]]
          }
          if (d.hasOwnProperty(driverKey) && driversMap.hasOwnProperty(d[driverKey])) {
            d[driverKey + "Id"] = driversMap[d[driverKey]]
          }
        });
        callback(data, instance);
      })
  }
}
