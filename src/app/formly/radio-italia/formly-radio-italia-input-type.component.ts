import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'radio-italia',
  template:
    `
    <div>
      <div *ngFor="let option of to.options; let i = index;" class="form-check">
        <input type="radio"
          [id]="id + '_' + i"
          [class.form-check-input]="to.formCheck !== 'custom'"
          [class.custom-control-input]="to.formCheck === 'custom'"
          [name]="id"
          [class.is-invalid]="showError"
          [attr.value]="option.value"
          [value]="option.value"
          [formControl]="formControl"
          [formlyAttributes]="field">
        <label class="font-weight-bold text-secondary" style="white-space: normal; text-overflow: clip; overflow: visible;"
          [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </div>
  `
  /*,


          [ngClass]="{ 'form-check': to.formCheck !== 'custom', 'form-check-inline': to.formCheck === 'inline', 'custom-control custom-radio': to.formCheck === 'custom' }"


            [class.form-check-label]="to.formCheck !== 'custom'"
          [class.custom-control-label]="to.formCheck === 'custom'"

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileValueAccessor),
      multi: true
    }
  ]
  */

})

export class FormlyRadioItaliaInputComponentFieldType extends FieldType {

    constructor() {
        super();
        console.log('RadioInputComponentFieldType:');
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