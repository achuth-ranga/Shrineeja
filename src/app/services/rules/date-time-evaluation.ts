import { Rule } from "./rule";
import { RuleType } from "./rule-type";

export class DateTimeHoursEvaluation implements Rule<Number>{

    getValue(obj: any, columns: any[]): Number {
        let diff = -1;
        if (columns.length == 2) {
            let date1 = obj[columns[0].date];
            let time1 = obj[columns[0].time];
            time1 = time1 && ((time1+"").split(":")).length == 2 ? time1 + ":00" : time1;
            let date2 = obj[columns[1].date];
            let time2 = obj[columns[1].time];
            time2 = time2 && ((time2+"").split(":")).length == 2 ? time2 + ":00" : time2;

            let d1: Date = new Date(date1 + " " + time1);
            let d2: Date = new Date(date2 + " " + time2);

            diff = Math.abs(+d2 - +d1) / 36e5;

        }
        return diff;
    }

}