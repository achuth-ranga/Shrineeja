import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MisMatserDataService } from 'src/app/services/mis-matser-data.service';
import { TableColumn } from 'src/app/services/models/table-column';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  public trips = new MatTableDataSource<any>();
  public columnsSchema: TableColumn[];
  public displayColumns: string[];

  constructor(public tripService: TripsService, public dataService: MisMatserDataService) {
    this.columnsSchema = this.tripService.getTripCoumns();
    this.displayColumns = this.columnsSchema.map((col) => col.key);
  }

  ngOnInit(): void {
    console.log("trips")
  }

}