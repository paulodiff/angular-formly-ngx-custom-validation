import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

// "^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$"

export function codiceFiscaleValidator(control: FormControl , field: FormlyFieldConfig): 
ValidationErrors {
  console.log("codiceFiscaleValidator");
   return !control.value || /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/.test(control.value) ? null : { 'codiceFiscaleValidator': true };
}

export function codiceFiscaleValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" non è nel formato corretto!`;
}


export function minMaxValidator(control: FormControl , field: FormlyFieldConfig): ValidationErrors {
  console.log("minMaxValidator", field.templateOptions.maxValue);
  // console.log(control);
  // console.log(control.value);
  // console.log(control.parent.controls);
  // console.log("1)", control.parent);
  // console.log("2)", control.parent.controls["firstName"]);
  // console.log("3)", control.parent.controls["firstName"].parent);
  // console.log('minMax');
  let maxValue = parseInt(field.templateOptions.maxValue);
  let minValue = parseInt(field.templateOptions.minValue);
  let curValue = parseInt(control.value);
  console.log("minMaxV",curValue, minValue, maxValue);
  let bValid = { 'ip': true };
  if ((curValue < maxValue) && (curValue > minValue)) {
    bValid = null;
  } else {
    bValid = { 'ip': true };
  }
  // return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
  console.log("minMaxV",control.value);
  console.log("minMaxV",bValid);
  return bValid;

}

export function minMaxValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not in RANGE`;
}


export function lifecycleFormlyExtension(field: FormlyFieldConfig) {
    console.log("lifecycle;", field.key);
    /*
    if (field.key === "reason") {
      field.hideExpression = (
        model: any,
        formState: any,
        field: FormlyFieldConfig
      ) => {
        if (model && model.color) {
          return model.color === "null";
        }
        return true;
      };
    }
    */
}

