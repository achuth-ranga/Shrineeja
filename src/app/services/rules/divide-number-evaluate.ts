import { Rule } from "./rule";

export class DivideNumberEvaluation implements Rule<Number>{

    constructor() { }

    getValue(obj: any, columns: any[]): Number {
        let diff = -1;
        if (columns.length == 2) {
            let number1 = obj[columns[0].number];
            let number2 = obj[columns[1].number];
            diff = (+number2 / +number1);
        }
        return diff;
    }
}