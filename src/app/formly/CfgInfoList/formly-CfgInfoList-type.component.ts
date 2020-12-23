import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
// const shajs = require('sha.js');
// import sha256 from 'crypto-js/sha256';

// var SHA256 = require("crypto-js/sha256");
// import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'formly-field-CfgInfoList',
  template: `
  <pre>CfgInfoList</pre>
  <pre>
  {{formControl}}
  {{to.label}}
  {{to.addText}}
  </pre>

<ng-template #fieldComponent></ng-template>

  <div 
    class="upload-btn-wrapper btn-block" 
    >
    <div *ngIf="!formControl.value">
    <button class="btn btn-primary btn-block">Seleziona un allegato</button>
    </div>

   
</div>

  <div *ngIf="formControl.value" 
    class="" role="alert">

    <table class="table table-bordered table-sm">
    <tr>
      <td>Nome:</td>
      <td>{{formControl.value.file_name}}</td>
    </tr>
    <tr>
      <td>Dim:</td>
      <td>{{formControl.value.file_size}} bytes</td>
    </tr>
    </table>



    <p>hash: {{formControl.value.file_hash}}</p>
        
    <button type="button" class="btn btn-warning btn-block" (click)="remove_item()">Rimuovi l'allegato</button>


    
    </div>
  `
})
export class FormlyCfgInfoListFieldType extends FieldType {
  [name: string]: any;

  public fileInfo: {};
  // public file: [];

 

  formatSize(size: number) {
    const k = 1000, dm = 1,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  remove_item() {
    console.log('... remove_item ...');
    this.formControl.setValue(null);
    // this.model[this.key] = this.formControl.value;
    // this.model[this.key]--;
    // this.formControl.setValue(this.model[this.key] );
    // this.propagateChange(this.counterValue);
  }


}