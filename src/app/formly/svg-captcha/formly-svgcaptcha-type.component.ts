import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'svgcaptcha',
  template: `
    

   
    
    <img [src]="'data:image/svg+xml;;utf8,' + formState.svgcaptcha.svgImage | safeHtml ">
    <p>{{formState.svgcaptcha.question}}</p>
   
    <input
    type="text"
    [formControl]="formControl"
    [formlyAttributes]="field"
    [class.is-invalid]="showError"
    >


 
    
  `,
})
export class FormlySvgCaptchaFieldType extends FieldType {}

// <img [src]="{{to.svgImage | safeHtml}}" class="u-sizeFit">
// <img [src]="'data:image/svg+xml;base64,' + to.svgImageB64 | safeHtml ">
// "data:image/svg+xml;base64,"