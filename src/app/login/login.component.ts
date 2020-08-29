import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { sha256, sha224 } from 'js-sha256';



@Component({
    templateUrl: './login.component.html'
})



export class LoginComponent implements OnInit, OnDestroy {


    public name = 'Login Component';
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
    token;
    error: string;
    userId: number = 1;
    uploadResponse = { status: '', message: '', filePath: '' };
    securityToken = '';
    srcUrl: string = "https://www.urbanpro.com/kolkata/self-and-beyond-golf-green/4422880";
    authUrl = "";

  constructor(
              private route: ActivatedRoute,
              private _appService: AppService
            ) {

              console.log('Login:constructor');


  }

  ngOnInit() {
    console.log('Login:ngOnInit');


    this.sub = this.route.params.subscribe(params => {
      console.log('Login:ngOnInit');
      // this.itemId = +params['id']; // (+) converts string 'id' to a number
      if( params['token']) {
        console.log('Login:OnInit:set:token');
        this.token = params['token'];
        console.log('token', this.token);
        // set token to service ...
      }
     
      // console.log('Json:itemId', this.itemId);
      // In a real app: dispatch action to load the details here.
      // recupera model,fields,options 
      

      },
      err => {
        console.log('errore:');
        console.log(err);
        },
      () => console.log('json:form:builded!')
    
    );

  
  
   
    
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
    let currentModel = this.model;
    let hmac_key = this.securityToken ? this.securityToken : '12345678';
    console.log('hmac key:', hmac_key);

    var hash = sha256.hmac.create(hmac_key);
    
    Object.keys(currentModel).forEach((key, index) => {
      //console.log(key, 
 
      if ( currentModel[key] instanceof File ) {
        console.log('hash add', key, currentModel[key].file_hash);
        hash.update(currentModel[key].file_hash);
      } 

      if (typeof currentModel[key] === 'string') {
        // formData.append(key, this.model[key]);  
        console.log('hash add', key, currentModel[key]);
        hash.update(currentModel[key]);
      }
              
       if (typeof currentModel[key] === 'boolean') {
        // formData.append(key, this.model[key]);  
        console.log('hash add', key, currentModel[key]);
        hash.update(currentModel[key].toString());
      }

    });

    console.log('hmac:', hash.hex());
  }

  goto1() {
    window.location.href = 'https://www.google.com';
  }

  getAuthUrl() {
    console.log('getAuthUrl ... ');

    this._appService.getAuthUrl().subscribe(
        (res) => {
          console.log(res);
          this.authUrl = res.url;
          // this.uploadResponse = res
        },
        (err) => {
          console.log(err);
          this.error = err
        },
        () => console.log('getAuthUrl:DONE!')
    );
  }

  uploadData() {
    console.log('##----------------------------');
    console.log(this.model);

    const formData = new FormData();  
    console.log('hmac key:', this.securityToken);

    var hash = sha256.hmac.create(this.securityToken);

    Object.keys(this.model).forEach((key, index) => {

      console.log(key, 
      this.model[key], 
      typeof this.model[key],
      this.model[key] instanceof File );

      if ( this.model[key] instanceof File ) {
        formData.append(key, this.model[key]);
        formData.append(key, this.model[key].file_hash);
        hash.update(this.model[key].file_hash);
      } 

      if (typeof this.model[key] === 'string') {
        formData.append(key, this.model[key]); 
        hash.update(this.model[key]);
      }


      if (typeof this.model[key] === 'boolean') {
        formData.append(key, this.model[key]);
        hash.update(this.model[key].toString());
      }

      // NO NUMBERS!!!!!!!!

    });

    // calcolo hashmac


    let formOptions = <any>{};
    

    let securityContext = <any>{};
    securityContext.rrtoken = this.securityToken;
    securityContext.rrhash = hash.hex();

    formData.append('securityContext', JSON.stringify(securityContext)); 

 

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