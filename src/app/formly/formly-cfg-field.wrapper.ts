import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field-cfg',
  template:  `


  
  <div class="form-group border-primary" [class.has-error]="showError">


  <p>CFG wr{{ to.label }} 
  
  <span *ngIf="to.required && to.hideRequiredMarker !== true"> (obbligatorio) </span> 
  
  </p>

  <p *ngIf="to.description">{{ to.description }}<p>

  <ng-template #fieldComponent></ng-template>
  
  <div *ngIf="showError" 
    class="border border-danger align-middle" 
  >
    
  <p class="font-weight-bold text-danger">Attenzione</p>
  <p class="text-red"><formly-validation-message [field]="field"></formly-validation-message></p>
             

  </div>
</div>


`
})
export class FormlyWrapperFormFieldCfg extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}


