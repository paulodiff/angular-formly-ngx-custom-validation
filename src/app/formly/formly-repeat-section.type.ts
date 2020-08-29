import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="border border-success p-2">
    
      <h5>{{to.itemName}} n. {{ i + 1  }}</h5>
      <formly-group [field]="field">

        <button class="btn btn-danger btn-lg btn-block" type="button" (click)="remove(i)">{{ to.removeText }} n. {{ i + 1 }}</button>
    
      </formly-group>
      
    </div>
    
    

      <button 
      class="btn btn-primary btn-lg btn-block p-2"
      type="button" (click)="add()">{{ to.addText }}</button>
  `,
})
export class FormlyRepeatTypeComponent extends FieldArrayType {}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */