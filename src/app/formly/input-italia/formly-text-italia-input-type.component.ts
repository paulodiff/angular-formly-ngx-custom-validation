import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'text-input',
  template:
  `
  <div>
  <!--<label [for]="id + '_' + i">{{to.label}}</label>-->
  <input
    type="text"
    [formControl]="formControl"
    [formlyAttributes]="field"
    [class.is-invalid]="showError"
    >
     
     </div>
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

export class FormlyInputItaliaComponentFieldType extends FieldType {

    constructor() {
        super();
        console.log('FormlyInputItaliaComponentFieldType:');
    }


  @Input()
  counterValue = 0;

  increment() {
    // this.counterValue++;
    // this.propagateChange(this.counterValue);
    // this.model.contatore++;
    // console.log(this.formControl.value);
    // console.log(this.formControl);
    // console.log(this.model);
    
    // this.model[this.key]++;
    // console.log(this.key);
    // console.log(this.id);
    
    // console.log(this.model[this.key]);

    this.model[this.key] = this.formControl.value;
    this.model[this.key]++;
    console.log(this.model[this.key]);
    this.formControl.setValue(this.model[this.key] );
    console.log(this.model[this.key]);
    console.log(this.formControl.value);



    
  }

 





}

/*

<formly-form *ngIf="input" [model]="order" [fields]="input">

    <input
    type="text"
    id="{{id}}"
    [formControl]="formControl"
    [formlyAttributes]="field"
    >


    <div class="form-group" [class.has-error]="showError">
      <label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
      </label>
      <ng-template #fieldComponent></ng-template>
      <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <small *ngIf="to.description" class="form-text text-muted">{{ to.description }}</small>
    </div>

*/