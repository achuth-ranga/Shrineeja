import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/services/models/table-column';
import { TripsService } from 'src/app/services/trips.service';
import { TripColumnType } from 'src/app/services/enums/trip-column-type';
import { MisMatserDataService } from 'src/app/services/mis-matser-data.service';
import { Rule } from 'src/app/services/rules/rule';
import { Rulefactory } from 'src/app/services/rules/rule-evaluation-factory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BulkuploadComponent } from '../bulkupload/bulkupload.component';
import { ValidatorFactory } from 'src/app/services/validators/validator-factory';
import { combineLatestWith, Observable } from 'rxjs';
import { UserType } from 'src/app/services/enums/user-type';
import { AuthService } from 'src/app/services/auth.service';
import { RuleProcessor } from 'src/app/services/rules/rules-processor';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  public trips = new MatTableDataSource<any>();
  public columnsSchema: TableColumn[] = [];
  public displayColumns: string[] = [];
  public note: string = "All columns must be entered before Saving";
  public ColumnTypes = TripColumnType;
  public role: string;
  public userType = UserType;

  @Output()
  newItemEvent = new EventEmitter<any>();
  public dialogRef?: MatDialogRef<BulkuploadComponent>;

  constructor(public tripService: TripsService, public dataService: MisMatserDataService, private snackBar: MatSnackBar, 
    public dialog: MatDialog, public authService: AuthService) {
    const newRow: any = this.getDummyData(true);
    this.trips.data = [newRow, ...this.trips.data];
    this.role = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.tripService.getTripCoumns().subscribe({
      next: (v) => this.onReportStructure(v),
      error: (e) => this.onReportStructureFaiure(e)
    });
  }


  onReportStructure(data: any) {
    this.columnsSchema = data.columns;
    this.displayColumns = this.columnsSchema.map((col) => col.key);
  }

  onReportStructureFaiure(error: any) {
    console.log(error);
  }

  addTrip(): void {
    const newRow: any = this.getDummyData(true);
    this.trips.data = [newRow, ...this.trips.data];
  }

  getDummyData(edit: boolean): any {
    const newRow: any = {
      isEdit: edit
    };
    this.setDefaultTimeValue('startTime', newRow);
    this.setDefaultTimeValue('endTime', newRow);
    return newRow;
  }

  save(row: any): void {
    this.tripService.saveTrip(row).subscribe({
      next: (v) => {
        v.isEdit = false
        this.trips.data[0] = v;
        this.trips.data = [this.getDummyData(true), ...this.trips.data];
        this.openSnackBar("green-snackbar", "Trip added Successfully", "close")
      },
      error: (e) => {
        row.isEdit = true
        console.log(e);
        this.openSnackBar("red-snackbar", "Failed to add trip", "close")
      }
    });
  }



  openSnackBar(color: string, message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000,
      panelClass: [color]
    });
  }

  setDefaultTimeValue(key: any, element: any) {
    if (key == 'startTime') {
      element[key] = "00:00";
    } else if (key == 'endTime') {
      element[key] = "12:00";
    }
  }


  inputHandler(event: any, object: any, key: string) {
    object[key] = event.target.value;
    this.populateDependentValues(object);
  }

  onDateReceivedFromChild(data: any) {
    let obj = data.object;
    obj[data.key] = data.value;
    this.populateDependentValues(obj);
  }

  onValueReceivedFromChild(data: any) {
    let obj = data.object

    // From select fields
    obj[data.key] = data.value.name;
    let id: string = data.key + "Id";
    if (data.value['id']) {
      obj[id] = data.value.id;
    }
    this.populateDependentValues(obj);
  }

  /***
   * Method to populate auto complete values,
   * like total hours from START DATE & END DATE
   */
  populateDependentValues(object: any) {
    RuleProcessor.processRulesAndPopulateDependentValues(object, this.columnsSchema);
  }


  /***
   * Opens popup to upload excel file
   */
  uploadTrips() {
    this.dialogRef = this.dialog.open(BulkuploadComponent, {
      width: '40%',
      data: {
        title: 'Upload Trips Data',
        columns: this.columnsSchema,
        templateName: "TripsTemplate.xlsx",
        validator: ValidatorFactory.getValidator("")
      },
    });

    const sub = this.dialogRef.componentInstance.submitClicked.subscribe(result => {
      this.dataService.updateIds(result, this.columnsSchema, this.finalResult, this);
      sub.unsubscribe();
    });
  }

  /**
   * Call back received when adding of additional ids are done.
   * 
   * @param data 
   * @param instance 
   */
  finalResult(data: any, instance: any) {
    let array: any[] = [];
    data.forEach((d: any) => {
      array.push(instance.tripService.saveTrip(d));
    });

    array[0].pipe(combineLatestWith(array.slice(1)))
      .subscribe((data: any[]) => {
        data.forEach((v: any) => {
          v.isEdit = false
          instance.trips.data = [...instance.trips.data, v];
        })
        instance.dialogRef?.close();
      })
  }
}