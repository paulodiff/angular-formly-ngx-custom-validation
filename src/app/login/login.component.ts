import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { sha256, sha224 } from 'js-sha256';
import moment from "moment";



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
    // fields: FormlyFieldConfig[];
    token;
    error: string;
    userId: number = 1;
    uploadResponse = { status: '', message: '', filePath: '' };
    securityToken = '';
    srcUrl: string = "https://www.urbanpro.com/kolkata/self-and-beyond-golf-green/4422880";
    authUrl = "";
    infoMe = "";
    oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJyZXBsLml0Iiwic3ViamVjdCI6IjhlZjVjNDNhLWU5MzktNGRhNy1hYmFjLWJkMjZiMTU4NGFjOCIsImV4cGlyZXNJbiI6NjAwLCJpYXQiOjE1OTg4ODE2ODF9.466Nf4W36xlAXD7qSriqJjxD98bH5s8D8sCUyByMjpk';

    // form = new FormGroup({});
    model: any = {};
    fields: FormlyFieldConfig[] = [

      {
        key: 'token',
        type: 'input',
        templateOptions: {
          label: 'Token',
          placeholder: '',
          required: false,
        },
      },

      {
        key: 'expiration',
        type: 'input',
        templateOptions: {
          label: 'expiration',
          placeholder: '',
          required: false,
        },
      }

    ];


  constructor(
              private route: ActivatedRoute,
              private _appService: AppService,
              private _authService: AuthService,
              private _loaderService: LoaderService
            ) {

              console.log('Login:constructor');


  }

  ngOnInit() {
    
    console.log('Login:ngOnInit');
    console.log('Login:ngOnInit', moment().format());
    
    this.model.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJyZXBsLml0Iiwic3ViamVjdCI6IjhlZjVjNDNhLWU5MzktNGRhNy1hYmFjLWJkMjZiMTU4NGFjOCIsImV4cGlyZXNJbiI6NjAwLCJpYXQiOjE1OTg4ODE2ODF9.466Nf4W36xlAXD7qSriqJjxD98bH5s8D8sCUyByMjpk';


    this.sub = this.route.params.subscribe(params => {
      console.log('Login:ngOnInit');
      // this.itemId = +params['id']; // (+) converts string 'id' to a number
      if( params['token']) {
        console.log('Login:OnInit:set:token');
        this.token = params['token'];
        console.log('token', this.token);
        this.model.token = this.token;
        this._authService.setToken(this.token);
        this.model.expiration = this._authService.getTokenExpiration();
        console.log(moment(this.model.expiration).tz("Europe/Rome").toISOString(true));

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

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJyZXBsLml0Iiwic3ViamVjdCI6IjhlZjVjNDNhLWU5MzktNGRhNy1hYmFjLWJkMjZiMTU4NGFjOCIsImV4cGlyZXNJbiI6NjAwLCJpYXQiOjE1OTg4ODE2ODF9.466Nf4W36xlAXD7qSriqJjxD98bH5s8D8sCUyByMjpk

  setToken() {
    console.log('login.setToken');
    console.log(this.model.token);
    this._authService.setToken(this.oldToken);
    this.model.expiration = this._authService.getTokenExpiration();
    console.log('login.expiration', moment(this.model.expiration).tz
    ("Europe/Rome").toISOString(true));
    // moment.locale('it');
    console.log('login.expiration', moment(this.model.expiration).tz("Europe/Rome").format('DD/MM/YYYY HH:mm:ss'));
  }

  removeToken() {
    console.log(this._authService.getToken());
    console.log('removeToken');
    this._authService.removeToken();
  }

  nameVal(field)  {
    console.log('nameVal');
    console.log('checking name');
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

  getMe() {
    console.log('getMe ... ');
    this._loaderService.isLoading.next(true);

    this._appService.getMe().subscribe(
        (res) => {
          console.log(res);
          this.infoMe = res;
          this._loaderService.isLoading.next(false);
          // this.uploadResponse = res
        },
        (err) => {
          console.log(err);
          this.error = err
          
        },
        () => {
          console.log('getMe:DONE!');
          this._loaderService.isLoading.next(false);
        }
    );
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