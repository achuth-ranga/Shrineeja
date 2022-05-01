import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/services/models/table-column';
import { TripsService } from 'src/app/services/trips.service';
import { TripColumnType } from 'src/app/services/enums/trip-column-type';
import { MisMatserDataService } from 'src/app/services/mis-matser-data.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  public trips = new MatTableDataSource<any>();
  public columnsSchema: TableColumn[];
  public displayColumns: string[];
  public ColumnTypes = TripColumnType;

  @Output()
  newItemEvent = new EventEmitter<any>();


  constructor(public tripService: TripsService, public dataService:MisMatserDataService) {
    this.columnsSchema = this.tripService.getTripCoumns();
    this.displayColumns = this.columnsSchema.map((col) => col.key);

    const newRow: any = this.getDummyData(true);
    this.trips.data = [newRow, ...this.trips.data];
  }

  ngOnInit(): void {

  }

  addTrip(): void {
    const newRow: any = this.getDummyData(true);

    this.trips.data = [newRow, ...this.trips.data];
  }

  getDummyData(edit: boolean): any {
    const newRow: any = {
      isEdit: edit
    };
    this.columnsSchema.forEach(col => {
      if (col.type == TripColumnType.DATE) {
        newRow[col.key] = "02/02/2022"
      } else if (col.type == TripColumnType.TIME) {
        newRow[col.key] = "02:00"
      } else if (col.type == TripColumnType.NUMBER) {
        newRow[col.key] = 50
      } else if (col.type == TripColumnType.EDIT) {
        newRow[col.key] = ""
      } else {
        newRow[col.key] = "data"
      }
    })
    return newRow;
  }

  editRow(row: any): void {
    row.isEdit = false
  }


  inputHandler(e: any, id: number, key: string) {
    // if (!this.valid[id]) {
    //   this.valid[id] = {};
    // }
    // this.valid[id][key] = e.target.validity.valid;
  }

  onValueReceivedFromChild(data: any){
    let obj = data.object
    obj[data.key] = data.value;
  }

}
