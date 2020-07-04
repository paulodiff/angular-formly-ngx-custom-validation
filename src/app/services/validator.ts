import { ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { FormlyModule, FormlyFieldConfig } from "@ngx-formly/core";
import { FormControl } from "@angular/forms";
import moment = require("moment");

// "^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$"

export function codiceFiscaleValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("codiceFiscaleValidator", control.value);
  return !control.value ||
    /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/.test(
      control.value
    )
    ? null
    : { codiceFiscaleValidator: true };
}

export function codiceFiscaleValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" non è nel formato corretto (cf1) !`;
}

// OMOCODIA

// /^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i

export function codiceFiscaleValidator2(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("codiceFiscaleValidator2");
  return !control.value ||
    /^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/.test(
      control.value
    )
    ? null
    : { codiceFiscaleValidator2: true };
}

export function codiceFiscaleValidator2Message(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" non è nel formato corretto (cf2) !`;
}

export function minMaxValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
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
  console.log("minMaxV", curValue, minValue, maxValue);
  let bValid = { ip: true };
  if (curValue < maxValue && curValue > minValue) {
    bValid = null;
  } else {
    bValid = { ip: true };
  }
  // return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
  console.log("minMaxV", control.value);
  console.log("minMaxV", bValid);
  return bValid;
}

export function minMaxValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not in RANGE`;
}

// date format Validator
/**
 * 
 * 
 ^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$
 * 
 * 
 */

export function dateValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  //console.log("dateValidator");
  return !control.value ||
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
      control.value
    )
    ? null
    : { dateValidator: true };
}

export function dateValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${
    field.formControl.value
  }" non è nel formato corretto gg/mm/aaaa (3) !`;
}

// email Validator
// /^\S+@\S+\.\S+$/

export function emailValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("emailValidator");
  return !control.value || /^\S+@\S+\.\S+$/.test(control.value)
    ? null
    : { emailValidator: true };
}

export function emailValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" non è nel formato corretto (2) !`;
}

export function lifecycleFormlyExtension(field: FormlyFieldConfig) {
  console.log("lifecycleFormlyExtension:", field.key);
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

// dateInRange

export function dateInRangeValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("dateInRangeValidator", field.templateOptions.maxValue);
  console.log(moment().format("dddd"));
  // console.log(control);
  // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
  let fromDate = field.templateOptions.fromDate;
  let toDate = field.templateOptions.toDate;
  let curValue = control.value;
  let fD = moment(curValue, "DD/MM/YYYY");
  console.log("dValidator", curValue, fromDate, toDate, fD);
  let bValid = { dateInRangeValidator: true };
  /*
  if ((curValue < maxValue) && (curValue > minValue)) {
    bValid = null;
  } else {
    bValid = { 'ip': true };
  }
  */
  // return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
  // console.log("minMaxV",control.value);
  // console.log("minMaxV",bValid);
  return bValid;
}

export function dateInRangeValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" date is not in RANGE`;
}


export function fileSizeValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("fileSizeValidator min:", field.templateOptions.minFileSize);
  console.log("fileSizeValidator max", field.templateOptions.maxFileSize);
  // console.log(moment().format("dddd"));
  // console.log(control);
  // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
  // let fromDate = field.templateOptions.fromDate;
  // let toDate = field.templateOptions.toDate;
  let curValue = control.value;
  // let fD = moment(curValue, "DD/MM/YYYY");
  console.log("fileSizeValidator ", curValue);
  let bValid = { fileSizeValidator: false };
  /*
  if ((curValue < maxValue) && (curValue > minValue)) {
    bValid = null;
  } else {
    bValid = { 'ip': true };
  }
  */
  // return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
  // console.log("minMaxV",control.value);
  // console.log("minMaxV",bValid);
  console.log("fileSizeValidator ", bValid);
  return bValid;
}

export function fileSizeValidatorMessage(err, field: FormlyFieldConfig) {
  return `ERROR file size not valid!`;
}