import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormControl } from '@angular/forms';
import { AppComponent } from './app.component';
import { JsonComponent} from './json/json.component';
import { MainComponent} from './main/main.component';
import { TabulatorTableComponent } from './tabulator/tabulator-table.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppService } from './services/app.service';
import { FormlyWrapperFormField } from './formly/formly-form-field.wrapper';
import { CounterInputComponentFieldType } from './formly/counter/formly-counter-type.component';
import { HtmlTemplateComponentFieldType } from './formly/html-template/formly-html-template-type.component';
import { FileValueAccessor } from './formly/file-value-accessor';
import { FormlyFileFieldType } from './formly/file/formly-file-type.component';

import * as FV from './services/validator';



export function IpValidator(control: FormControl , field: FormlyFieldConfig): ValidationErrors {
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

export function IpValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not in RANGE`;
}

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,

    RouterModule.forRoot([

      { path: 'json', component: JsonComponent },
      { path: 'main', component: MainComponent },
      { path: 'json/:itemId', component: JsonComponent },
      { path: 'tabulator', component: TabulatorTableComponent }

    ]),

    FormlyModule.forRoot({

      types: [
          { name: 'counter', component: CounterInputComponentFieldType },
          { name: 'upload', component: FormlyFileFieldType, defaultOptions: { defaultValue: [], }, wrappers: ['form-field'] },
          { name: 'html-template', component: HtmlTemplateComponentFieldType, defaultOptions: { defaultValue: [], }, wrappers: ['form-field'] }
      ],

       wrappers: [
        { name: 'form-field', component: FormlyWrapperFormField }
      ],

      validators: [
        { name: 'ip', validation: IpValidator },
        { name: 'codiceFiscaleValidator', validation: FV.codiceFiscaleValidator },
        { name: 'minMax', validation: FV.minMaxValidator},
        { name: 'dateValidator', validation: FV.dateValidator},
        { name: 'dateInRangeValidator', validation: FV.dateInRangeValidator},
        { name: 'emailValidator', validation: FV.emailValidator}
      ],

      validationMessages: [
        { name: 'ip', message: IpValidatorMessage },
        { name: 'codiceFiscaleValidator', message: FV.codiceFiscaleValidatorMessage },
        { name: 'minMax', message: FV.minMaxValidatorMessage },
        { name: 'dateValidator', message: FV.dateValidatorMessage },
        { name: 'dateInRangeValidator', message: FV.dateInRangeValidatorMessage },
        { name: 'emailValidator', message: FV.emailValidatorMessage },

        { name: 'required', message: 'Questo campo è richiesto' }


      ],

      extensions: [
        {
          name: "hide_expression",
          extension: {
            prePopulate: FV.lifecycleFormlyExtension
          }
        }
      ]

    }),

    HttpModule,
    HttpClientModule

  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    JsonComponent,
    MainComponent,
    TabulatorTableComponent,


    // LoaderComponent,
    // SafeHtmlPipe,
    FileValueAccessor,
    // RatingInputComponent,
    FormlyWrapperFormField,
    CounterInputComponentFieldType,
    HtmlTemplateComponentFieldType,
    // CounterInputComponentFieldType,
    // CheckboxInputComponentFieldType,
    // TextInputComponentFieldType,
    // HtmlTemplateComponentFieldType,
    // SelectInputComponentFieldType,
    // RadioInputComponentFieldType,
    FormlyFileFieldType,
    // FormlyUploadFieldType,
    // FormlyNg2UploadFieldType,
    // FormlyDescriptionFieldType,
    // FormlySvgCaptchaFieldType  

  ],
   providers: [
    AppService   
  ]
})
export class AppModule { }


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */