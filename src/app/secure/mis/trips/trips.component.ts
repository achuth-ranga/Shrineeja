import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { UserType } from 'src/app/services/enums/user-type';
import { MisMatserDataService } from 'src/app/services/mis-matser-data.service';
import { TableColumn } from 'src/app/services/models/table-column';
import { TripsService } from 'src/app/services/trips.service';
import { MatPaginator } from '@angular/material/paginator';
import { ExportType, MatTableExporterDirective } from 'mat-table-exporter';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  public trips = new MatTableDataSource<any>();
  public columnsSchema: TableColumn[] = [];
  public displayColumns: string[];
  public role: string = "";
  public userType = UserType;

  @ViewChild('paginator')
  private paginator!: MatPaginator;
  public pageEvent: PageEvent = new PageEvent;
  public pageIndex: number = 0;
  public pageSize: number = 20;
  public length: number = 0; // Total Number of Objects
  public pageSizeOptions: number[] = [20];
  public downloadInProgress: boolean = false;

  public filterObj: any = { 'limit': this.pageSize, 'page': 1 };


  constructor(private tripService: TripsService, public dataService: MisMatserDataService,
    private authService: AuthService,) {
    this.displayColumns = this.columnsSchema.map((col) => col.key);
  }

  ngOnInit(): void {
    this.trips.paginator = this.paginator;
    this.role = this.authService.getUserRole();
    this.tripService.getTripCoumns().subscribe({
      next: (v) => this.onReportStructure(v),
      error: (e) => this.onReportStructureFaiure(e)
    });
  }

  onReportStructure(data: any) {
    this.columnsSchema = data.columns;
    this.displayColumns = this.columnsSchema.map((col) => col.key);
    this.fetchTrips();
  }

  onReportStructureFaiure(error: any) {
    console.log(error);
  }

  onDriverSelected(driverObj: any) {
    this.filterObj['driverId'] = driverObj.value.id
  }

  onDateSelected(dateObj: any) {
    this.filterObj[dateObj.key] = dateObj.value
  }

  onPageChange(event: any) {
    this.filterObj.page = event.pageIndex + 1;
    this.fetchTrips();
    return event;
  }

  fetchTrips() {
    this.callServiceToFetchTrips(this.filterObj);
  }

  callServiceToFetchTrips(filter: any) {
    this.tripService.fetchTrips(filter).subscribe({
      next: (v: any) => this.onTripsDataReceived(v),
      error: (e) => this.onErrorReceivingTripsData(e)
    });
  }

  onTripsDataReceived(tripsData: any) {
    if (this.downloadInProgress) {
      this.downloadInProgress = false;
      try {
        this.createExcelOutOfTable(tripsData.payload);
      } catch (error) {
        console.log(error);
      }
    } else if (tripsData.hasOwnProperty('total')) {
      this.trips.data = tripsData.payload;
      this.length = tripsData.total;
    } else {
      this.trips.data = tripsData.payload;
    }
  }

  onErrorReceivingTripsData(error: any) {
    console.log(error);
  }

  exportTable() {
    this.downloadInProgress = true;
    let queryFilter: any = {
      limit: this.length,
      page: 0
    }
    this.callServiceToFetchTrips(queryFilter);
  }

  createExcelOutOfTable(data: any) {
    let arr = data;
    let i: number = 0;
    let organised: any[] = [];
    data.forEach((obj:any) => {
      let newObj:any = {};
      this.displayColumns.forEach((k) => newObj[k] = obj[k])
      organised.push(newObj);
    })
    let Heading = [this.columnsSchema.map((col) => col.label)];
    //Had to create a new workbook and then add the header
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, organised, { origin: 'A2', skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, 'trips');
    XLSX.writeFile(wb, 'TripData.xlsx');
  }





}
