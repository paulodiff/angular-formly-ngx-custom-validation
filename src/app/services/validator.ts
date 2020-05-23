import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

export class Validator {

 minMaxValidator(control: FormControl , field: FormlyFieldConfig): ValidationErrors {
  console.log(field.templateOptions.maxValue);
  // console.log(control);
  // console.log(control.value);
  // console.log(control.parent.controls);
  // console.log("1)", control.parent);
  // console.log("2)", control.parent.controls["firstName"]);
  // console.log("3)", control.parent.controls["firstName"].parent);
  let maxValue = parseInt(field.templateOptions.maxValue);
  let minValue = parseInt(field.templateOptions.minValue);
  let curValue = parseInt(control.value);
  console.log(curValue, minValue, maxValue);
  let bValid = { 'ip': true };
  if ((curValue < maxValue) && (curValue > minValue)) {
    bValid = null;
  } else {
    bValid = { 'ip': true };
  }
  // return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
  console.log(control.value);
  console.log(bValid);
  return bValid;

}

 minMaxValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not in RANGE`;
}

}


