import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableColumn } from './models/table-column';

@Injectable({
  providedIn: 'root'
})
export class DieselDataService {

  private serviceUrl: string = environment.server_uri;
  private reportsStructureUrl: string = environment.server_uri + "/reports/query";
  private addDieselDataUrl: string = environment.server_uri + "/dieseldata/add";
  private queryDieselDataUrl: string = environment.server_uri + "/dieseldata/query";

  constructor(private http: HttpClient) { }

  getAddDieselDataCoumns(): Observable<TableColumn[]> {
    let request: any = {
      'types': ["dieselReport"]
    }
    return this.http.post<TableColumn[]>(this.reportsStructureUrl, request, {})
      .pipe<any>(map((data: any) => data.payload[0]));
  }

  getDieselDataViewColumns(): Observable<TableColumn[]> {
    let request: any = {
      'types': ["dieselReportView"]
    }
    return this.http.post<TableColumn[]>(this.reportsStructureUrl, request, {})
    .pipe<any>( map((data:any) => data.payload[0]));
  }

  saveDieselData(trip: any) : Observable<any>{
    return this.http.put<any>(this.addDieselDataUrl, trip, {});
  }

  fetchDieselData(filter: any) : Observable<any[]>{
    return this.http.post<any[]>(this.queryDieselDataUrl, filter, {});
  }


}
