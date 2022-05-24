import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserType } from 'src/app/services/enums/user-type';
import { TableColumn } from 'src/app/services/models/table-column';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class UserViewComponent implements OnInit {

  public userViewType: any;
  public tableDataSource = new MatTableDataSource<any>();
  public columnsSchema: TableColumn[] = [];
  public displayColumns: string[];
  public title: string = '';

  @ViewChild('paginator')
  private paginator!: MatPaginator;
  public pageEvent: PageEvent = new PageEvent;
  public pageIndex: number = 0;
  public pageSize: number = 20;
  public length: number = 0; // Total Number of Objects
  public pageSizeOptions: number[] = [20];
  public downloadInProgress: boolean = false;

  public filterObj: any = { 'limit': this.pageSize, 'page': 1 };


  constructor(private router: Router, private service: UserService, private authService: AuthService) {
    if (this.router.url === '/supervisors') {
      this.userViewType = UserType.SUPERVISOR
      this.title = "Supervisors"
    } else if (this.router.url === '/drivers') {
      this.userViewType = UserType.DRIVER
      this.title = "Drivers"
    }
    this.filterObj.userTypes = [this.userViewType];
    this.displayColumns = this.columnsSchema.map((col) => col.key);
  }

  ngOnInit(): void {
    this.tableDataSource.paginator = this.paginator;
    this.service.getUserViewColumns().subscribe({
      next: (v) => this.onReportStructure(v),
      error: (e) => this.onReportStructureFaiure(e)
    });
  }

  onReportStructure(data: any) {
    this.columnsSchema = data.columns;
    this.displayColumns = this.columnsSchema.map((col) => col.key);
    this.fetchData();
  }

  onReportStructureFaiure(error: any) {
    console.log(error);
  }


  onPageChange(event: any) {
    this.filterObj.page = event.pageIndex + 1;
    this.fetchData();
    return event;
  }

  fetchData() {
    this.callServiceToFetchData(this.filterObj);
  }

  callServiceToFetchData(filter: any) {
    this.service.fetchUsers(filter).subscribe({
      next: (v: any) => this.onDataReceived(v),
      error: (e) => this.onErrorReceivingData(e)
    });
  }

  onDataReceived(tripsData: any) {
    if (this.downloadInProgress) {
      this.downloadInProgress = false;
      try {
        this.createExcelOutOfTable(tripsData.payload);
      } catch (error) {
        console.log(error);
      }
    } else if (tripsData.hasOwnProperty('total')) {
      this.tableDataSource.data = tripsData.payload;
      this.length = tripsData.total;
    } else {
      this.tableDataSource.data = tripsData.payload;
    }
  }

  onErrorReceivingData(error: any) {
    console.log(error);
  }

  exportTable() {
    this.downloadInProgress = true;
    let queryFilter: any = {
      userTypes: [this.userViewType],
      limit: this.length,
      page: 0
    }

    if (this.filterObj.driverId != '') {
      queryFilter.driverId = this.filterObj.driverId;
    }
    this.callServiceToFetchData(queryFilter);
  }

  createExcelOutOfTable(data: any) {
    let arr = data;
    let i: number = 0;
    let organised: any[] = [];
    data.forEach((obj: any) => {
      let newObj: any = {};
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
    XLSX.writeFile(wb, this.userViewType + "s.xlsx");
  }

}
