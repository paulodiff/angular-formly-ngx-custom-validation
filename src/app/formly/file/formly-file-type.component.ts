import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
const shajs = require('sha.js');

@Component({
  selector: 'formly-field-file',
  styleUrls: ['./formly-file-type.component.css'],
  template: `
  

  <div class="upload-btn-wrapper btn-block" [hidden]="formControl.value.file_name">
    <button class="btn btn-primary btn-block">Seleziona un allegato</button>
    <input type="file" 
     [hidden]="formControl.value.file_name"
     [formControl]="formControl" [formlyAttributes]="field" (change)="onChange1(key, $event.target.files)">
</div>

  <div *ngIf="formControl.value.file_name" 
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
export class FormlyFileFieldType extends FieldType {
  [name: string]: any;

  public fileInfo: {};
  // public file: [];

  onChange1(key, event) {
    console.log('onChange1');
    console.log('key:', key);
    console.log('event:', event);
    console.log('event.lenght:', event.length);
    if( event.length === 1 ) {
      console.log('Set file data to model:');

      for (const file of event) {
        
        console.log(file);
        console.log(file.name);
        console.log(this.formatSize(file.size));

        file.file_id = key;
        file.file_name = file.name;
        file.file_size = file.size;
        file.file_type = file.type;

        // https://medium.com/@0xVaccaro/hashing-big-file-with-filereader-js-e0a5c898fc98
        // calcolo sha 256 back
        // file.file_hash = Math.random();
        // file.file_hash = sha256File(file.name);

        this.buildHash(file);

        // this.formControl.setValue(file);
        // file.file_folder = this.to.folder;
        // this.files.push(file);

        console.log(this.formControl);
        console.log(this.formControl.value);
      }
    }

    if( event.length === 0 ) {
      console.log('ReSet file data to model:');
      this.formControl.setValue([]);
    }

  }

  uploadFiles(event, form) {
    const files = [];
    for (const file of event.files) {
      file.file_id = Math.random();
      file.file_folder = this.to.folder;
      files.push(file);
    }
    this.makeFileRequest(files);
    form.clear();
  }

  makeFileRequest(files: Array<any>) {
    const filesData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      filesData.append('uploads[]', files[i], files[i].name);
    }

    this.formControl.patchValue([
      ...this.formControl.value,
      ...files.map(file => ({
        file_id: file.file_id,
        file_name: file.name,
        file_folder: file.file_folder,
        file_type: file.type,
        file_size: file.size,
      }))
    ]);

    //filesArray and filesData File Stored Onto Database and Server.
  }



  formatSize(size: number) {
    const k = 1000, dm = 1,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  remove_item() {
    console.log('... remove_item ...');
    this.formControl.setValue([]);
    // this.model[this.key] = this.formControl.value;
    // this.model[this.key]--;
    // this.formControl.setValue(this.model[this.key] );
    // this.propagateChange(this.counterValue);
  }

  buildHash(file) {
    console.log('buildHash');
    var reader = new FileReader();

    reader.onload = (event) => {
      var data = event.target.result;
      // var encrypted = CryptoJS.SHA256( data );
      var encrypted = shajs('sha256').update(data).digest('hex');
      console.log('encrypted1: ' + encrypted);
      file.file_hash = encrypted;
      this.formControl.setValue(file);   
    };

     reader.onloadend  =  (event) => {
            //myReader.result is a String of the uploaded file
            console.log('onLoadEnd!');

            var data = event.target.result;
            // var encrypted = CryptoJS.SHA256( data );
            var encrypted = shajs('sha256').update(data).digest('hex');
            console.log('encrypted2: ' + encrypted);

            //fileString = myReader.result would not work, 
            //because it is not in the scope of the callback
        }


    reader.readAsBinaryString(file);
    
    return 'sha256';
  }

}

/*

{{formControl.value | json}} <button type="button" (click)="remove_item()">Rimuovi</button>

class="row"

    <p-fileUpload #form showCancelButton="false" customUpload="true" maxFileSize="5000000"
    multiple="multiple" allowTypes="/(\.|\/)(txt|doc|docx|xls|xlsx|pdf|png|jpeg|jpg|gif)$/"
    (uploadHandler)="uploadFiles($event,form)">
      <ng-template pTemplate="content">
      <div class="row">
        <p-table *ngIf="formControl.value" [scrollable]="true" scrollHeight="200px" [responsive]="true"
        [value]="formControl.value" >
          <ng-template pTemplate="caption">
            Uploaded Documents
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-file>
            <tr>
              <td>{{file.name}}</td>
              <td>{{formatSize(file.size)}}</td>
              <td>
                <button type="button" class="raised-btn" pButton icon="fa fa-download"
                  label="Download" (click)="downloadFile(file)"></button>
                <button type="button" class="raised-btn" pButton icon="fa fa-trash"
                  label="Delete" (click)="deleteFile(file.fileId)"></button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
      </ng-template>
    </p-fileUpload>
*/