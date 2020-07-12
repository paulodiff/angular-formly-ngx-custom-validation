import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'checkbox-italia',
  template:
    `
<div>
  <div class="form-check">
  {{id}}#{{to.label}}
    <input 
      id="{{id}}"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
      type="checkbox">
    <label for="{{id}}">{{id}}#{{to.label}}</label>
  </div>
</div>
  `


})

export class FormlyCheckboxItaliaInputComponentFieldType extends FieldType {

    constructor() {
        super();
        console.log('CheckboxItaliaInputComponentFieldType:');
    }


  @Input()
  counterValue = 0;


  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  // As mentioned earlier, it takes a new value from the form model and writes it into the view. 
  // In our case, all we need is updating the counterValue property, as it’s interpolated automatically.
  // This method gets called when the form is initialized, with the form model’s initial value

  writeValue(value: any) {
    if (value !== undefined) {
      this.counterValue = value;
    }
  }
  


}