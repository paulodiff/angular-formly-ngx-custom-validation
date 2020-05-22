import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormControl } from '@angular/forms';
import { AppComponent } from './app.component';
import { JsonComponent} from './json/json.component';
import { MainComponent} from '.main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { applyEmailValidation } from './email.extension';

export function IpValidator(control: FormControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
}

export function IpValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid IP Address`;
}

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    RouterModule.forRoot([
      { path: 'json', component: JsonComponent },
      { path: 'main', component: MainComponent }
    ]),
    FormlyModule.forRoot({

      validators: [
        { name: 'ip', validation: IpValidator },
      ],

      validationMessages: [
        { name: 'ip', message: IpValidatorMessage },
      ],

    }),
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
})
export class AppModule { }


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */