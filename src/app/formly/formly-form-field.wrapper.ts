import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field',
  template:  `<div class="form-group border border-primary p-2" [class.has-error]="showError">
  <h5>{{ to.label }} <span *ngIf="to.required && to.hideRequiredMarker !== true"> (obbligatorio) </span> </h5>
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
export class FormlyWrapperFormField extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}


/*

<small *ngIf="to.description" class="form-text text-muted">{{ to.description }}</small>

  <label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
    {{ to.label }}
    <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
  </label>


```````

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

[
          '<div class="formly-template-wrapper form-group"',
              'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
            // '<label for="{{::id}}">WRAP - {{options.templateOptions.label}}</label>',
            '<formly-transclude></formly-transclude>',
            '<div class="validation"',
              'style="color:maroon"',
              'ng-if="options.validation.errorExistsAndShouldBeVisible"',
              'ng-messages="options.formControl.$error">',
              // '<div ng-messages-include="validation.html"></div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="max">Valore troppo alto</div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="maxSize">Dimensione file eccessiva</div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="pattern">Formato file non valido. Solo Pdf</div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="required">Questo valore è obbligatorio</div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="minlength">Valore troppo corto</div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="maxlength">Valore troppo lungo</div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="email">Formato email non valido</div>',
              '<div class="Prose Alert Alert--error Alert--withIcon u-layout-prose u-padding-r-bottom u-padding-r-right u-margin-r-bottom u-text-h3" ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
              '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
            '</div>',
          '</div>',
          '</div>'
        ].join(' ')

 */   