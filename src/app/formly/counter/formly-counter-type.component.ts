import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'counter-input',
  template:
    `<p>In formly:
    <button type="button" (click)="increment()">+</button>
    <input
    type="text"
    [formControl]="formControl"
    [formlyAttributes]="field"
    >
    <button type="button" (click)="decrement()">-</button>
    </p>
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

export class CounterInputComponentFieldType extends FieldType {

    constructor() {
        super();
        console.log('CounterInputComponentFieldType:');
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

  decrement() {
    this.model[this.key] = this.formControl.value;
    this.model[this.key]--;
    this.formControl.setValue(this.model[this.key] );
    // this.propagateChange(this.counterValue);
  }

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