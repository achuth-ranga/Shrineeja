import { FormGroup } from "@angular/forms";

export class ReactiveFormValidator {


  static getErrorMessage(form: FormGroup, key: string): string {
    let error: string = '';
    if (form.controls[key].hasError('required')) {
      error = 'You must enter a value';
    } else if (form.controls[key].hasError('email')) {
      error = 'Not a valid email';
    } else if (form.controls[key].hasError('minlength')) {
      error = 'Min length is ' + form.controls[key]?.errors?.['minlength']?.['requiredLength'];
    } else if (form.controls[key].hasError('maxlength')) {
      error = 'Max length is ' + form.controls[key]?.errors?.['maxlength']?.['requiredLength'];
    }
    return error;
  }
}