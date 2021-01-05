import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormControl } from '@angular/forms';
import { AppComponent } from './app.component';
import { JsonComponent} from './json/json.component';
import { EditorComponent} from './editor/editor.component';
import { LoginComponent} from './login/login.component';
import { SchemaComponent} from './schema/schema.component';
import { MainComponent} from './main/main.component';
import { TabulatorTableComponent } from './tabulator/tabulator-table.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';

import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { LoaderComponent } from './loader/loader.component';


import { FormlyWrapperFormField } from './formly/formly-form-field.wrapper';
import { FormlyWrapperFormFieldCfg } from './formly/formly-cfg-field.wrapper';
import { FormlyWrapperFormFieldCfgAll } from './formly/formly-cfg-all.wrapper';
import { CounterInputComponentFieldType } from './formly/counter/formly-counter-type.component';
import { HtmlTemplateComponentFieldType } from './formly/html-template/formly-html-template-type.component';
import { FileValueAccessor } from './formly/file-value-accessor';
import { FormlyFileFieldType } from './formly/file/formly-file-type.component';
import { FormlyCheckboxItaliaInputComponentFieldType } from './formly/checkbox-italia/formly-checkbox-italia-type.component';

import { FormlyRadioItaliaInputComponentFieldType } from  './formly/radio-italia/formly-radio-italia-input-type.component';

import { FormlyInputItaliaComponentFieldType } from './formly/input-italia/formly-text-italia-input-type.component';

import { FormlySelectItaliaComponentFieldType } from './formly/select-italia/formly-select-input-type.component';

import { FormlyAuthInfoFieldType } from './formly/authinfo/formly-authinfo-type.component';

import { FormlySvgCaptchaFieldType } from './formly/svg-captcha/formly-svgcaptcha-type.component';

import { FormlyRepeatTypeComponent } from './formly/formly-repeat-section.type';
import { FormlyRepeatTableTypeComponent } from './formly/formly-repeat-section-table.type';

import { FormlyCfgInfoListFieldType } from './formly/CfgInfoList/formly-CfgInfoList-type.component';

import { SafeHtmlPipe} from './pipes/safeHTML.pipe';
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
      { path: 'editor/:itemId', component: EditorComponent },
      { path: 'main', component: MainComponent },
      { path: 'login', component: LoginComponent },
      { path: 'login/:token', component: LoginComponent },
      { path: 'json/:itemId', component: JsonComponent },
      { path: 'schema', component: SchemaComponent },
      { path: 'tabulator', component: TabulatorTableComponent }

    ]),

    FormlyModule.forRoot({

      types: [
          { name: 'counter', component: CounterInputComponentFieldType },
          { name: 'rr-upload', component: FormlyFileFieldType, 
          // defaultOptions: { defaultValue: [], } ,
          wrappers: ['form-field'] },
          // { name: 'html-template', component: HtmlTemplateComponentFieldType, defaultOptions: { defaultValue: [], } },
          { name: 'rr-html', component: HtmlTemplateComponentFieldType },
          { name: 'rr-checkbox', component: FormlyCheckboxItaliaInputComponentFieldType,
          defaultOptions: { }, wrappers: ['form-field']},
          {name : 'rr-radio', component: FormlyRadioItaliaInputComponentFieldType,
          wrappers: ['form-field']},

          {name : 'rr-input', component: FormlyInputItaliaComponentFieldType,
          wrappers: ['form-field']},

           {name : 'rr-input-no-wrap', component: FormlyInputItaliaComponentFieldType},

          {name : 'rr-select', component: FormlySelectItaliaComponentFieldType,
          wrappers: ['form-field']},
          {name : 'rr-authinfo', component: FormlyAuthInfoFieldType,
          wrappers: ['form-field']},
          {name : 'rr-svgcaptcha', component: FormlySvgCaptchaFieldType,
          wrappers: ['form-field']},
          {name : 'rr-repeat-section', component: FormlyRepeatTypeComponent,
          wrappers: ['form-field']},
          {name : 'rr-repeat-section-table', component: FormlyRepeatTableTypeComponent},

          {name : 'CfgInfoList', component: FormlyCfgInfoListFieldType,
          wrappers: ['form-field-cfg-all']},
          
          {name : 'cfg-input', component: FormlyInputItaliaComponentFieldType,
          wrappers: ['form-field-cfg']}


          
      ],

       wrappers: [
         { name: 'form-field', component: FormlyWrapperFormField },
         { name: 'form-field-cfg', component: FormlyWrapperFormFieldCfg },
         { name: 'form-field-cfg-all', component: FormlyWrapperFormFieldCfgAll }

      ],

      validators: [
        { name: 'ip', validation: IpValidator },
        { name: 'codiceFiscaleValidator', validation: FV.codiceFiscaleValidator },
        { name: 'ibanValidator', validation: FV.ibanValidator },
        { name: 'minMax', validation: FV.minMaxValidator},
        { name: 'dateValidator', validation: FV.dateValidator},
        { name: 'dateInRangeValidator', validation: FV.dateInRangeValidator},
        { name: 'emailValidator', validation: FV.emailValidator},
        { name: 'fileValidator', validation: FV.fileValidator},
        { name: 'capValidator', validation: FV.capValidator},
        { name: 'euroValidator', validation: FV.euroValidator},
        { name: 'euroInRangeValidator', validation: FV.euroInRangeValidator},
        { name: 'checkboxValidator', validation: FV.checkboxValidator},
        { 
          name: 'avoidStartingAndEndnigSpaceValidator',
          validation: FV.avoidStartingAndEndingSpaceValidator
        },
        { 
          name: 'defaultUserInputValidator',
          validation: FV.defaultUserInputValidator
        }

      ],

      validationMessages: [
        { name: 'ip', message: IpValidatorMessage },
        { name: 'codiceFiscaleValidator', message: FV.codiceFiscaleValidatorMessage },
        { name: 'ibanValidator', message: FV.ibanValidatorMessage },
        { name: 'minMax', message: FV.minMaxValidatorMessage },
        { name: 'dateValidator', message: FV.dateValidatorMessage },
        { name: 'dateInRangeValidator', message: FV.dateInRangeValidatorMessage },
        { name: 'emailValidator', message: FV.emailValidatorMessage },
        { name: 'fileValidator', message: FV.fileValidatorMessage },
        { name: 'required', message: 'Questo dato è richiesto' },
        { name: 'capValidator', message: FV.capValidatorMessage },
        { name: 'euroValidator', message: FV.euroValidatorMessage },
        { name: 'euroInRangeValidator', message: FV.euroInRangeValidatorMessage },
        { 
          name: 'checkboxValidator', 
          message: FV.checkboxValidatorMessage 
        },
        {
          name : 'avoidStartingAndEndnigSpaceValidator',
          message : FV.avoidStartingAndEndnigSpaceValidatorMessage
        },
        { 
          name: 'defaultUserInputValidator',
          message: FV.defaultUserInputValidatorMessage
        }



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
    EditorComponent,
    SchemaComponent,
    MainComponent,
    TabulatorTableComponent,
    LoginComponent,
    LoaderComponent,


    // LoaderComponent,
    SafeHtmlPipe,
    FileValueAccessor,
    // RatingInputComponent,
    FormlyWrapperFormField,
    FormlyWrapperFormFieldCfg,
    FormlyWrapperFormFieldCfgAll,
    CounterInputComponentFieldType,
    HtmlTemplateComponentFieldType,
    FormlyCheckboxItaliaInputComponentFieldType,
    FormlyRadioItaliaInputComponentFieldType,
    FormlyInputItaliaComponentFieldType,
    FormlySelectItaliaComponentFieldType,
    FormlyAuthInfoFieldType,
    FormlySvgCaptchaFieldType,
    FormlyRepeatTypeComponent,
    FormlyRepeatTableTypeComponent,
    FormlyCfgInfoListFieldType,
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
    AppService,
    AuthService,

    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }   
  ]
})
export class AppModule { }


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */