import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormControl } from '@angular/forms';
import { AppComponent } from './app.component';
import { JsonComponent} from './json/json.component';
import { MainComponent} from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppService } from './services/app.service';


export function IpValidator(control: FormControl): ValidationErrors {
  console.log(control);
  console.log(control.value);
  console.log(control.parent.controls);
  console.log("->", control.parent.controls["firstName"]);
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

    HttpModule,
    HttpClientModule

  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    JsonComponent,
    MainComponent
  ],
   providers: [
    AppService   
  ]
})
export class AppModule { }


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */