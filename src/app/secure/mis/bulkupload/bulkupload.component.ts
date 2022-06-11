import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumn } from 'src/app/services/models/table-column';
import { ExcelUtil } from 'src/app/services/excel/excel-util';
import { Validator } from 'src/app/services/validators/validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripColumnType } from 'src/app/services/enums/trip-column-type';

@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css']
})
export class BulkuploadComponent implements OnInit {

  @Output()
  submitClicked = new EventEmitter<any>();

  public jsonData: any[] = [];

  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BulkuploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit(): void {
  }


  downloadTemplate() {
    ExcelUtil.createExcel(this.getHeaders(), this.data.columns, [], this.data.templateName, "template");
  }

  getHeaders() {
    return this.data.columns.map((col: any) => col.key);
  }

  openSnackBar(color: string, message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 5000,
      panelClass: [color]
    });
  }

  submit() {
    this.submitClicked.emit(this.jsonData)
  }

  onFileChange(event: any) {
    if (event.target.files[0]) {
      ExcelUtil.fileToJson(event, this, this.onExcelReadAsJson);
    }
  }

  /***
   * This is a call back triggered when excel sheet is read as json is 
   * done.
   */
  onExcelReadAsJson(jsonArray: any[], instance: any) {
    let map: any = {};
    instance.data.columns.forEach((col: any) => map[col.label] = col)
    let converted: any = [];
    jsonArray.forEach((o: any) => {
      let obj: any = {};
      Object.keys(o).forEach(function (key, index) {
        let formattedKey = key.replace(/\$/g, ''); // For any column has formula, header is added with $ sign, so removing it
        if (map.hasOwnProperty(formattedKey)) {
          let value = o[key];
          if (map[formattedKey].type === TripColumnType.DATE) {
            value = instance.formatDate(value);
          }
          if (map[formattedKey].type === TripColumnType.TIME) {
            value = instance.formatTime(value);
          }
          obj[map[formattedKey].key] = value;
        }
      });
      converted.push(obj);
    });
    let validator: Validator<any> = instance.data.validator;
    if (validator) {
      try {
        validator.isValid(converted, instance.data.columns);
        instance.jsonData = converted;
      } catch (error) {
        let msg: string = "";
        if (typeof error === "string") {
          msg = error.toUpperCase()
        } else if (error instanceof Error) {
          msg = error.message
        }
        instance.openSnackBar("red-snackbar", msg, "close")
      }
    } else {
      instance.jsonData = converted;
    }
  }

  formatDate(date: string): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  formatTime(time: string): string {
    // expected formats are HH:mm:ss H:mm:s
    time = time.toLowerCase();
    let array = time.split(":");
    if (array.length == 2) {
      array.push("00");
    }
    if (array[2].length > 2) {
      // This may contains AM or PM
      let val = array[2];
      if (val.indexOf("am") >= 0) {
        // we are good no change needed
        val = val.replace(/ /g, '').replace("am", "");
      } else if (val.indexOf("pm") >= 0) {
        let hour = Number(array[0]);
        if (hour + 12 == 24) {
          array[0] = "00";
        } else {
          array[0] = "" + (hour + 12);
        }
        val = val.replace(/ /g, '').replace("pm", "");
      }
      array[2] = val;
    }
    array = array.map(v => this.adjustTimeLength(v));
    return array[0] + ":" + array[1] + ":" + array[2];;
  }

  adjustTimeLength(str: string): string {
    if (str.length == 1) {
      return "0" + str;
    }
    return str;
  }
}


