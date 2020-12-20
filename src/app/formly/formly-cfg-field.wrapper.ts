import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field-cfg',
  template:  `
  
  <div class="form-group border border-primary p-2" [class.has-error]="showError">


  <h5>CFG CFG{{ to.label }} 
  
  <span *ngIf="to.required && to.hideRequiredMarker !== true"> (obbligatorio) </span> </h5>
  <p *ngIf="to.description">{{ to.description }}<p>
  <ng-template #fieldComponent></ng-template>
  
  <div *ngIf="showError" 
    class="border border-danger align-middle p-2" 
  >
    
  <h5 class="font-weight-bold text-danger">Attenzione</h5>
  <p class="card-text text-red"><formly-validation-message [field]="field"></formly-validation-message></p>
          
   

  </div>
</div>
`
})
export class FormlyWrapperFormFieldCfg extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}


