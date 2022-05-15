import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, from } from 'rxjs';
import { User } from '../secure/mis/add-tripdetails/user';
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

  constructor(private http: HttpClient) { }

  getTripCoumns(): Observable<TableColumn[]> {
    let request: any = {
      'types': ["vehicleTrip"]
    }
    return this.http.post<TableColumn[]>(this.reportsStructureUrl, request, {})
    .pipe<any>( map((data:any) => data.payload[0]));

    // return TripReportColumns;
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data.users));
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: User[]): Observable<User[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<User>(`${this.serviceUrl}/${user.id}`)
      )
    );
  }
}
