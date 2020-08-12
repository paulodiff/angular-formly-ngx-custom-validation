import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { sha256, sha224 } from 'js-sha256';



@Component({
    templateUrl: './json.component.html'
})

export class JsonComponent implements OnInit, OnDestroy {

    public name = 'Json Informazioni di PWA';
    public items: any;
    public itemId;
    public tableName;
    connection;
    message;
    private sub: any;
    form = new FormGroup({});
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[];
    model;
    error: string;
    userId: number = 1;
    uploadResponse = { status: '', message: '', filePath: '' };
    securityToken = '';

  constructor(
              private route: ActivatedRoute,
              private _appService: AppService
            ) {

              console.log('Json:constructor');


  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      console.log('Json:ngOnInit');
      // this.itemId = +params['id']; // (+) converts string 'id' to a number
      this.itemId = params['itemId'];
      console.log('Json:itemId', this.itemId);
      // In a real app: dispatch action to load the details here.
      // recupera model,fields,options 
      this._appService.getFormData(this.itemId).subscribe(([model, fields, options ]) => {
        console.log('returned data ... building form ... ');
        // this.options = {};
        this.model = {};
        this.fields = null;
        this.model = model;
        this.fields = fields;
        this.options = options;

        console.log(options);
        if(options && options.formState && options.formState.security ) {
          this.securityToken = options.formState.security.token;
        }

        // this.options = options;

        // this.options.formState.mainModel = this.model;
        // riassegna delle funzioni per ora sumExpr che fa una somma di due campi
        this.fields = fields.map(f => {

          if (f.templateOptions && f.templateOptions.sumExpr) {
            console.log('json:assign:change:function',f.templateOptions.changeExpr);
            f.templateOptions.change = 
            Function('field', 'this.sumOnChange(field)').bind(this);
          }

          // recupera i dati da una select con dati async
          if (f.templateOptions && f.templateOptions.optionsUrl) {
            console.log('json:async:loading:data:',f.templateOptions.optionsUrl);
             this._appService.getFormData('tabulator').subscribe(([model, fields, options ]) => {
               f.templateOptions.options = fields;
             });
            // f.templateOptions.options = {};
          }

          return f;
        });
      },
      err => {
        console.log('errore:');
        console.log(err);
        },
      () => console.log('json:form:builded!')
      );
    });


  
   
    
  } // ngOnInit - end

  nameVal(field)  {
    console.log('nameVal');
    console.log('checking name');
  }

  sumOnChange(field) {
    // console.log('nameChange');
    console.log('sumOnChange', field.key);
    console.log('sumOnChange', field.templateOptions);
    console.log(field.parent.form);

    console.log(field.templateOptions.sumExpr.destField);
    let d = field.templateOptions.sumExpr.destField;
    field.parent.formControl.controls[d].setValue("SUM!");
    // field.parent.formControl // will return FormGroup
    // field.parent.form // will return FormArray
    //  to access to the FormArray from the child FormGroup knowing which // index in the array has the child FormGroup assigned?

    //field.parent.form.at(field.parent.key) // which will return the same result as `field.parent.formControl`
    // field.model.lastName="";
    // console.log(field.model);
  }

  multiplyOnChange(field) {
    console.log('multiplyOnChange', field);
  }

  nameChange(field) {
    // console.log('nameChange');
    console.log('nameChange', field.key);
    console.log('nameChange', field.templateOptions);
    console.log('nameChange', field.parent.formControl.controls["mac"].setValue("ss"));
    console.log(field.parent.form);
    // field.parent.formControl // will return FormGroup
    // field.parent.form // will return FormArray
    //  to access to the FormArray from the child FormGroup knowing which // index in the array has the child FormGroup assigned?

    //field.parent.form.at(field.parent.key) // which will return the same result as `field.parent.formControl`
    // field.model.lastName="";
    // console.log(field.model);
  }

  ngOnDestroy() {
    // this.connection.unsubscribe();
   
    this.sub.unsubscribe();
  
  }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    } else {
      alert('errori da sistemare');
    }
  }

  hmac() {
    console.log('hmac .... ');

    var hash = sha256.hmac.create('key');
    
    Object.keys(this.model).forEach((key, index) => {
      //console.log(key, 
      //this.model[key], 
      //typeof this.model[key],
      //this.model[key] instanceof File );

      
      // hash.update('Message to hash');


      if ( this.model[key] instanceof File ) {
        // formData.append(key, this.model[key]);
        // formData.append(key, this.model[key].file_hash);  
        // hash.update('Message to hash');
        console.log('hash add', key, this.model[key].file_hash);
        hash.update(this.model[key].file_hash);
      } 

      if (typeof this.model[key] === 'string') {
        // formData.append(key, this.model[key]);  
        console.log('hash add', key, this.model[key]);
        hash.update(this.model[key]);
      }
              

    });

    console.log('hmac:', hash.hex());
  }

  uploadData() {
    console.log('##----------------------------');
    console.log(this.model);

    const formData = new FormData();  

    Object.keys(this.model).forEach((key, index) => {
      console.log(key, 
      this.model[key], 
      typeof this.model[key],
      this.model[key] instanceof File );

      if ( this.model[key] instanceof File ) {
        formData.append(key, this.model[key]);
        formData.append(key, this.model[key].file_hash);  
      } 

      if (typeof this.model[key] === 'string') {
        formData.append(key, this.model[key]);  
      }
      
        

    });

    let formOptions = <any>{};
    formOptions.securityToken = this.securityToken;

    this._appService.uploadData(formData, formOptions).subscribe(
        (res) => {
          console.log(res);
          // this.uploadResponse = res
        },
        (err) => {
          console.log(err);
          this.error = err
        },
        () => console.log('uploadData:DONE!')
    );
    


   
    //console.log(this.files);

    //const formData: FormData = new FormData();
    // formData.append('file', this.model.file);
     

    // this.http.post('medias', formData);
  }

}