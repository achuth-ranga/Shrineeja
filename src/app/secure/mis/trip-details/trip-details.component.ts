import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/services/models/table-column';
import { TripsService } from 'src/app/services/trips.service';
import { TripColumnType } from 'src/app/services/enums/trip-column-type';
import { MisMatserDataService } from 'src/app/services/mis-matser-data.service';
import { RuleType } from 'src/app/services/rules/rule-type';
import { NumberEvaluation } from 'src/app/services/rules/number-evaluate';
import { Rule } from 'src/app/services/rules/rule';
import { DateTimeHoursEvaluation } from 'src/app/services/rules/date-time-evaluation';
import { Rulefactory } from 'src/app/services/rules/rule-evaluation-factory';

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

  @Output()
  newItemEvent = new EventEmitter<any>();


  constructor(public tripService: TripsService, public dataService: MisMatserDataService) {
    const newRow: any = this.getDummyData(true);
    this.trips.data = [newRow, ...this.trips.data];
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
    return newRow;
  }

  save(row: any): void {
    row.isEdit = false
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
    let id: string = data.key + "_id";
    if (data.value['id']) {
      obj[id] = data.value.id;
    }
    console.log(data)
    console.log(obj);
    this.populateDependentValues(obj);
  }

  /***
   * Method to populate auto complete values,
   * like total hours from START DATE & END DATE
   */
  populateDependentValues(object: any) {
    this.columnsSchema.forEach(column => {
      if (column.hasOwnProperty('rule')) {
        let rule: any = column.rule;
        let ruleEvaluator: Rule<any> = Rulefactory.getRuleEvaluator(rule.type);
        if (ruleEvaluator) {
          let value = ruleEvaluator.getValue(object, column.rule.columns);
          if (value) {
            try {
              let limitedTo = (Math.round(value * 100) / 100).toFixed(2);
              object[column.key] = limitedTo;
            } catch (error) {
              object[column.key] = value;
            }
          }
        }
      }
    });
  }

}
