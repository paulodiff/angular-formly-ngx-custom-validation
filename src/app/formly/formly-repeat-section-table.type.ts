import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section-table',
  template: `
    


    <div class="row">
      <div class="col-sm-6">
      SECTION TABLE
      </div>
      <div class="col-sm-6">

      <button 
      class="btn btn-primary btn-sm btn-block p-2"
      type="button" (click)="add()">{{ to.addText }}</button>
      </div>
    </div>

    <div 
    *ngFor="let field of field.fieldGroup; let i = index;" 
    class="border border-success p-2">

    <div class="row">
      <div class="col-sm-6">
      {{to.itemName}} n. {{ i + 1  }}
      </div>
      <div class="col-sm-6">
           <button 
        class="btn btn-danger btn-sm btn-block" type="button" (click)="remove(i)">{{ to.removeText }} n. {{ i + 1 }}</button>
      </div>
    </div>
      
  <!--
      <h5>{{to.itemName}} n. {{ i + 1  }}</h5>
              <button 
        class="btn btn-danger btn-sm btn-block" type="button" (click)="remove(i)">{{ to.removeText }} n. {{ i + 1 }}</button>
    --> 
    
      <formly-group [field]="field">
               
      </formly-group>
           
      
    </div>
    
    

      <button 
      class="btn btn-primary btn-lg btn-block p-2"
      type="button" (click)="add()">{{ to.addText }}</button>
  `,
})
export class FormlyRepeatTableTypeComponent extends FieldArrayType {}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */