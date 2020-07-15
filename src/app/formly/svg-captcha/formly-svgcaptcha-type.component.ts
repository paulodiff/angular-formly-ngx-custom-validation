import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'svgcaptcha',
  template: `
    <div class="card"><div class="card-body">

    <p class="u-text-h3">{{to.title}}</p>
    <p>{{formState.svgcaptcha.image}}</p>

    
    <p>{{to.description}}</p>
    <p>{{id}}</p>
    <input
    type="text"
    [formControl]="formControl"
    [formlyAttributes]="field"
    [class.is-invalid]="showError"
    >

    </div></div>
  `,
})
export class FormlySvgCaptchaFieldType extends FieldType {}

// <img [src]="{{to.svgImage | safeHtml}}" class="u-sizeFit">
// <img [src]="'data:image/svg+xml;base64,' + to.svgImageB64 | safeHtml ">
// "data:image/svg+xml;base64,"