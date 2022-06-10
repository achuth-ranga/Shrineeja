import { Validator } from "./validator";

import { ColumnsValidator } from "./columns-validator";

export class ValidatorFactory {

    private static columnsValidator: ColumnsValidator = new ColumnsValidator();

    static getValidator(validatorType: string): Validator<any> {
        let validator!: Validator<any>;
        validator = this.columnsValidator;
        return validator;
    }
}