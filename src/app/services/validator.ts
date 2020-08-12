import { ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { FormlyModule, FormlyFieldConfig } from "@ngx-formly/core";
import { FormControl } from "@angular/forms";
import moment = require("moment");
import ibantools = require('ibantools');
import Utils from './utils'


// IBAN

export function ibanValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("ibanValidator", control.value);
  return !control.value ||
    ibantools.isValidIBAN(control.value )
    ? null
    : { ibanValidator: true };
}

export function ibanValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" non è nel formato corretto (iban) !`;
}


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

// CODICE FISCALE OMOCODIA

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
  console.log("dateValidator");
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
// /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/

export function emailValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("emailValidator");
  return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(control.value)
    ? null
    : { emailValidator: true };
}

export function emailValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" non è nel formato corretto (2) !`;
}

// lifecycle - EXTENSION

export function lifecycleFormlyExtension(field: FormlyFieldConfig) {
  console.log("lifecycleFormlyExtension NOOP :", field.key);
  
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
  console.log("dateInRangeValidator", field.templateOptions.fromDate);
  console.log("dateInRangeValidator", field.templateOptions.toDate);
  // console.log(control);
  // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
  let fromDate = moment(field.templateOptions.fromDate,"DD/MM/YYYY");
  let toDate = moment(field.templateOptions.toDate,"DD/MM/YYYY");
  let curValue = moment(control.value,"DD/MM/YYYY");
  // let fD = moment(curValue, "DD/MM/YYYY");
  console.log("dateInRangeValidator", curValue, fromDate, toDate);
  console.log(moment(curValue).isBetween(fromDate, toDate));
  let bValid = { dateInRangeValidator: true };
  if ( moment(curValue).isBetween(fromDate, toDate) ) {
    console.log("dateInRangeValidator",'OK');
    bValid = null;
  }
  return bValid;
}

export function dateInRangeValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" date is not in RANGE`;
}

// fileValidator size and extension

export function fileValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  // console.log("fileValidator min:", field.templateOptions.minFileSize);
  // console.log("fileValidator max", field.templateOptions.maxFileSize);
  // console.log(moment().format("dddd"));
  // console.log(control);
  // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
  let minFileSize = Utils.translateSize(field.templateOptions.minFileSize);
  let maxFileSize = Utils.translateSize(field.templateOptions.maxFileSize);
  // let toDate = field.templateOptions.toDate;

  if(!control.value) {
    console.log('fileValidator', control.value);
    return null;
  }

  let curValue = control.value;
  let curFileSize = curValue.file_size;
  
  // let fD = moment(curValue, "DD/MM/YYYY");
  // console.log("fileSizeValidator ", curValue);
  // console.log("fileSizeValidator ", curFileSize, minFileSize, maxFileSize);
  // console.log(curFileSize, minFileSize, (curFileSize >= minFileSize));
  // console.log(curFileSize, maxFileSize, (curFileSize <= maxFileSize));

  // controllo dimensione
  let bValid = null;
  if((curFileSize < minFileSize) || (curFileSize > maxFileSize)) {
      console.log("fileSizeValidator dimensione NON valida!");
      bValid = { fileValidator: { message: 'dimensione NON valida' } };
  } else {
    console.log("fileSizeValidator dimensione  valida!");
  }

  // controllo estensione
  // console.log("fileValidator ext:", field.templateOptions.fileExtension);
  if (Utils.isFileNameInPattern(curValue.file_name,field.templateOptions.fileExtension)){
       console.log("fileSizeValidator estensione valida!");
  } else {
      console.log("fileSizeValidator estensione NON valida!");
      bValid = { fileValidator: { message: 'estensione NON valida' } };
  }
  // let bValid = { fileSizeValidator: false };
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

export function fileValidatorMessage(err, field: FormlyFieldConfig) {
  console.log('fileValidatorMessage', err);
  console.log(field);
  return `ERRORE dimensione file o formato NON validi!`;
}

// CAP 

export function capValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("capValidator");
  return !control.value ||
    /^[0-9]{5}$/.test(
      control.value
    )
    ? null
    : { capValidator: true };
}

export function capValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${
    field.formControl.value
  }" CAP non è nel formato corretto NNNNN`;
}


// EURO

export function euroValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("euroValidator", control.value);
  return !control.value ||
    /^([0-9]*[,][0-9][0-9])$/.test(
      control.value
    )
    ? null
    : { euroValidator: true };
}

export function euroValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" non  formato corretto 12335,00 (euro1) !`;
}


export function euroInRangeValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("euroInRangeValidator", field.templateOptions.fromEuro);
  console.log("euroInRangeValidator", field.templateOptions.toEuro);
  // console.log(control);
  // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
  let fromEuro = parseFloat(field.templateOptions.fromEuro);
  let toEuro = parseFloat(field.templateOptions.toEuro);
  let curValue = parseFloat(control.value);
  // let fD = moment(curValue, "DD/MM/YYYY");
  console.log("euroInRangeValidator", curValue, fromEuro, toEuro);
  // console.log(curValue).isBetween(fromDate, toDate));
  let bValid = { euroInRangeValidator: true };
  if (( curValue >= fromEuro) && (curValue <= toEuro))  {
    console.log("euroInRangeValidator",'OK');
    bValid = null;
  }


  return bValid;
}

export function euroInRangeValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" euro is not in RANGE`;
}

// CheckBox 

export function checkboxValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("checkboxValidator", control.value);
  if( field.templateOptions.required) {
    console.log('checkbox IS required');
    if (!control.value) {
      return { checkboxValidator: true };
    } else {
      return  null;
    }

  } else {
    console.log('checkbox NOT required');
    return null;
  }

}

export function checkboxValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${
    field.formControl.value
  }" checkboxValidator Check richiesto (3) !`;
}



// NO trailing spaces validator


export function avoidStartingAndEndingSpaceValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("avoidStartingAndEndingSpaceValidator", control.value);
  console.log(/^[\s]*(.*?)[\s]*$/.test(control.value));
  return !control.value ||
    /^[\s]*(.*?)[\s]*$/.test(
      control.value
    )
    ? null
    : { avoidStartingAndEndingSpaceValidator: true };
}

export function avoidStartingAndEndingSpaceValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${
    field.formControl.value
  }" sono presenti spazi bianchi prima o dopo il dato inserito`;
}

// default user input validator
// un validatore che consente maiuscole minuscole spazio e numeri


export function defaultUserInputValidator(
  control: FormControl,
  field: FormlyFieldConfig
): ValidationErrors {
  console.log("defaultUserInputValidator", control.value);
  console.log(/^[a-zA-Z 0-9_-]{1,255}$/.test(control.value));
  return !control.value ||
    /^[a-zA-Z 0-9_-]{1,255}$/.test(
      control.value
    )
    ? null
    : { defaultUserInputValidator: true };
}

export function defaultUserInputValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${
    field.formControl.value
  }" controllare il dato inserito NON deve contenere caratteri speciali`;
}