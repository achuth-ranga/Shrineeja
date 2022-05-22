import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripReportColumns } from 'src/app/services/models/trip-data'
import { TableColumn } from './models/table-column';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private serviceUrl: string = environment.server_uri;
  private reportsStructureUrl: string = environment.server_uri + "/reports/query";
  private addTrip: string = environment.server_uri + "/vehicletrips/add";
  private postTripsUrl: string = environment.server_uri + "/vehicletrips/query";


  constructor(private http: HttpClient) { }

  getTripCoumns(): Observable<TableColumn[]> {
    let request: any = {
      'types': ["vehicleTrip"]
    }
    return this.http.post<TableColumn[]>(this.reportsStructureUrl, request, {})
    .pipe<any>( map((data:any) => data.payload[0]));
  }

  getTripsViewColumns(): Observable<TableColumn[]> {
    let request: any = {
      'types': ["vehicleTripsView"]
    }
    return this.http.post<TableColumn[]>(this.reportsStructureUrl, request, {})
    .pipe<any>( map((data:any) => data.payload[0]));
  }

  saveTrip(trip: any) : Observable<any>{
    return this.http.put<any>(this.addTrip, trip, {});
  }

  fetchTrips(filter: any) : Observable<any[]>{
    return this.http.post<any[]>(this.postTripsUrl, filter, {});
  }

  
}
