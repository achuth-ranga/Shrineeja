import { TableColumn } from "../models/table-column";
import { Rule } from "./rule";
import { Rulefactory } from "./rule-evaluation-factory";

export class RuleProcessor {

    /***
     * Method to populate auto complete values,
     * like total hours from START DATE & END DATE
     */
    static processRulesAndPopulateDependentValuesInEach(objects: any[], columnsSchema: TableColumn[]) {
        objects.forEach((object: any) => RuleProcessor.processRulesAndPopulateDependentValues(object, columnsSchema));
    }

    /***
     * Method to populate auto complete values,
     * like total hours from START DATE & END DATE
     */
    static processRulesAndPopulateDependentValues(object: any, columnsSchema: TableColumn[]) {
        columnsSchema.forEach(column => {
            if (column.hasOwnProperty('rule')) {
                let rule: any = column.rule;
                let ruleEvaluator: Rule<any> = Rulefactory.getRuleEvaluator(rule.type);
                if (ruleEvaluator) {
                    let value = ruleEvaluator.getValue(object, column.rule.columns);
                    if (value !== null) {
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