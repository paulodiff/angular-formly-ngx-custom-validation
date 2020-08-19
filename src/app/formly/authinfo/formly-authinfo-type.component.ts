import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'authinfo',
  template: `
    

   
   <h1>Auth Info</h1>
   
  
    <p>{{formState.security.token}}</p>
   
    <input
    type="text"
    [formControl]="formControl"
    [formlyAttributes]="field"
    [class.is-invalid]="showError"
    >


 
    
  `,
})
export class FormlyAuthInfoFieldType extends FieldType {}

// <img [src]="{{to.svgImage | safeHtml}}" class="u-sizeFit">
// <img [src]="'data:image/svg+xml;base64,' + to.svgImageB64 | safeHtml ">
// "data:image/svg+xml;base64,"