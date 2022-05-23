import { DateTimeHoursEvaluation } from "./date-time-evaluation";
import { DivideNumberEvaluation } from "./divide-number-evaluate";
import { NumberEvaluation } from "./number-evaluate"
import { Rule } from "./rule";
import { RuleType } from "./rule-type";

export class Rulefactory {
    private static numberEvaluation: NumberEvaluation = new NumberEvaluation();
    private static dateTimeHours: DateTimeHoursEvaluation = new DateTimeHoursEvaluation();
    private static divideEvaluation: DivideNumberEvaluation = new DivideNumberEvaluation();

    static getRuleEvaluator(ruleType: string): Rule<any> {
        let ruleEvaluator!: Rule<any>;
        switch (ruleType) {
            case RuleType.NUMBER:
                ruleEvaluator = this.numberEvaluation;
                break;
            case RuleType.DATE_TIME_HOURS:
                ruleEvaluator = this.dateTimeHours;
                break;
            case RuleType.DIVIDE:
                ruleEvaluator = this.divideEvaluation;
                break;
        }
        return ruleEvaluator;
    }

}