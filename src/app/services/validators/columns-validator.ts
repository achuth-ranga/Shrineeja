import { TripColumnType } from "../enums/trip-column-type";
import { TableColumn } from "../models/table-column";
import { Validator } from "./validator";

export class ColumnsValidator implements Validator<any>{


    isValid(data: any[], columns: TableColumn[]): boolean {
        let map = new Map();
        columns.forEach((col: any) => {
            if (col.type != TripColumnType.EDIT) {
                map.set(col.key, col)
            }
        });
        let i: number = 0;
        data.forEach(o => {
            i++;
            // Each object should contain all the required columns
            map.forEach((col, key) => {
                if (!o.hasOwnProperty(key)) {
                    throw new Error("Row " + i + " doesn't have column " + col.label);
                }
                switch (col.type) {
                    case TripColumnType.NUMBER:
                        if (!this.isNumber(o[key])) {
                            throw new Error("Row " + i + "column " + col.label + " value is not a number");
                        }
                        break;
                    case TripColumnType.DATE:
                        if (!this.isValidDate(o[key])) {
                            throw new Error("Row " + i + "column " + col.label + " value is not a date(yyyy-MM-dd)");
                        }
                        break;
                    case TripColumnType.TIME:
                        if (!this.isValidTime(o[key])) {
                            throw new Error("Row " + i + "column " + col.label + " value is not a time(HH:mm)");
                        }
                        break;
                    case TripColumnType.TEXT:
                        if (!o[key]) {
                            throw new Error("Row " + i + "column " + col.label + " value is empty");
                        }
                        break;
                }
            })
        })
        return true;
    }


    isNumber(value: string | number): boolean {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }


    isValidDate(dateString: string): boolean {
        var pattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(pattern)) {
            return false;
        }
        return true;
    }

    isValidTime(dateString: string): boolean {
        var regEx = /^\d{2}:\d{2}:\d{2}$/;
        if (!dateString.match(regEx)) {
            return false;
        }
        return true;
    }

}