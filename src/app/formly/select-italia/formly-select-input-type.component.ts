import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'select-input',
  template:
    `
    <select
    [formControl]="formControl"
    [class.is-invalid]="showError"
    [formlyAttributes]="field">
    <option *ngIf="to.placeholder" value="">{{ to.placeholder }}</option>
    <ng-container *ngFor="let item of to.options">
      <optgroup *ngIf="item.group" label="{{item.label}}">
        <option *ngFor="let child of item.group" [value]="child.value" [disabled]="child.disabled">
          {{ child.value }}
        </option>
      </optgroup>
      <option *ngIf="!item.group" [value]="item.name" [disabled]="item.disabled">{{ item.value }}</option>
    </ng-container>
  </select>
  `
  /*,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileValueAccessor),
      multi: true
    }
  ]
  */

})

export class FormlySelectItaliaComponentFieldType extends FieldType {

    constructor() {
        super();
        console.log('FormlySelectItaliaComponentFieldType:');
    }


  @Input()
  counterValue = 0;

  

 

  


}