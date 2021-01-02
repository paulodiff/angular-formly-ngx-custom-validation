import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field-cfg-all',
  template:  `


  
<div class="border border-secondary">

  <small>[formly-wrapper-form-field-cfg-all]</small>
  <ng-template #fieldComponent></ng-template>
  
</div>


`
})
export class FormlyWrapperFormFieldCfgAll extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}

