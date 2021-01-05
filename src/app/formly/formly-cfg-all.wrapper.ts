import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field-cfg-all',
  template:  `


  
<div class="border border-secondary p-3">


  <small>[formly-wrapper-form-field-cfg-all]</small>
  {{key}} <button (click)="removeItem(key)"
class="btn btn-primary submit-button">Remove</button>
  <ng-template #fieldComponent></ng-template>

  
</div>


`
})
export class FormlyWrapperFormFieldCfgAll extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}

