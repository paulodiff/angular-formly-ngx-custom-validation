import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { sha256, sha224 } from 'js-sha256';



@Component({
    templateUrl: './editor.component.html'
})

export class EditorComponent implements OnInit, OnDestroy {

    public name = 'Editor Informazioni di PWA';
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
        console.log('json.component:ngOnInit:getFormData...');
        // this.options = {};
        this.model = {};
        this.fields = null;
        this.model = model;
        this.fields = fields;
        this.options = options;

        console.log('model:',model);
        console.log('options:',options);
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
      console.log(this.form.valid);
    }
  }

  removeItem(o) {
    console.log('remoteItem',o);
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

addItemAsync() {
  console.log('addItemAsync');
  let cfgType = 'infoHeader';
  console.log('addItemAsync', cfgType);
  this._appService.getCfg(cfgType).subscribe((cfgField) => {
        console.log('returned data ... building form ... ');
        
        cfgField.key = cfgType + Math.floor(Math.random() * Math.floor(1000)).toString();
        console.log(cfgField.key);
        console.log(cfgField);
        // cfgField.type = 'infoList';
        
        // this.options = {};
        // this.model = {};
        this.fields = [
          ...this.fields,
          cfgField
        ];

        
        this.model[cfgField.key] = {};
        this.model[cfgField.key].key = cfgField.key;
        this.model[cfgField.key].type = cfgType;
  });
}

addItem2Form() {
    console.log('add item to form');


    console.log(this.fields);


let f2 : FormlyFieldConfig = {

      fieldGroupClassName: "row",
      key : "f2",
      templateOptions: {
        addText: 'Add another investment',
      },
       fieldGroup: [
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'key',
            templateOptions: {
              label: 'f-key',
              type: 'input',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'type',
            className: 'col-sm-6',
            templateOptions: {
              type: 'input',
              label: 'f-type'
            },
          },

          {
            fieldGroupClassName: "row",
             key : "templateOptions",
             fieldGroup: [
              {
                className: 'col-sm-6',
                type: 'input',
                key: 'label',
                templateOptions: {
                  label: 'label',
                  type: 'input',
                  required: true,
                },
              },
              {
                type: 'input',
                key: 'description',
                className: 'col-sm-6',
                templateOptions: {
                  type: 'input',
                  label: 'description'
                },
              }
             ]
          },
      {
      "key": "options",
      "type": "rr-repeat-section",
      "templateOptions": {
        "addText" : "Aggiungi un nom",
        "removeText" : "Rimuovi il nominativo",
        "itemName" : "Elemen",
        "label": "Elenco nominativi",
        "description": "Gestione dei nomin..."
      },
      
      "fieldArray": {
          "fieldGroupClassName": "row",
          "fieldGroup": [
            {
              "type": "rr-input",
              "key": "Nome1",
              "className": 'col-sm-6',
              "templateOptions": {
                "label": "Nome",
                "required": true
              }
            },
            {
              "type": "rr-input",
              "key": "Cognome1",
              "className": 'col-sm-6',
              "templateOptions": {
                "label": "Valore",
                "required": true
              }
            }
          ]

      }
   
    }

       ]

};

let f1: FormlyFieldConfig = {
      key: 'investments',
      type: 'rr-repeat-section',
      templateOptions: {
        addText: 'Add another investment',
      },
      fieldArray: {
        fieldGroup: [
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'investmentName',
            templateOptions: {
              label: 'Name of Investment:',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'investmentDate',
            className: 'col-sm-4',
            templateOptions: {
              type: 'date',
              label: 'Date of Investment:',
            },
          },
          {
            type: 'input',
            key: 'stockIdentifier',
            className: 'col-sm-4',
            templateOptions: {
              label: 'Stock Identifier:',
            },
          },
        ],
      },
    };






    let dynamic: FormlyFieldConfig = {};
    dynamic.templateOptions = {};
    dynamic.key = 'ggt' + Math.floor(Math.random() * Math.floor(10000)).toString();
    dynamic.type = 'input';
    dynamic.templateOptions.type = 'text';
    dynamic.templateOptions.label = 'Dynamic:' + dynamic.key;
    
    console.log(dynamic);
    
    // this.fields.push(dynamic);


     this.fields = [
        ...this.fields,
        f2
        // dynamic
     ];

 
     

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