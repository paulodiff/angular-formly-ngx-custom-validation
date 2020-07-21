import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Validators, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
    templateUrl: './schema.component.html'
})

export class SchemaComponent implements OnInit, OnDestroy {

    public name = 'Schema Informazioni di PWA';
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

  constructor(
              private route: ActivatedRoute,
              private _appService: AppService,
              private formlyJsonschema: FormlyJsonschema
            ) {

              console.log('Json:constructor');


  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      console.log('Schema:ngOnInit');
      // this.itemId = +params['id']; // (+) converts string 'id' to a number
      // this.itemId = params['itemId'];
      this.itemId = 'schema';
      console.log('Json:itemId', this.itemId);
      // In a real app: dispatch action to load the details here.
      // recupera model,fields,options 
      this._appService.getFormData(this.itemId).subscribe(([model, fields, options ]) => {
        console.log('returned data ... building form ... ');
        // this.options = {};

        // this.type = type;
        this.form = new FormGroup({});
        this.options = {};
        this.fields = [this.formlyJsonschema.toFieldConfig(fields)];
        this.model = model;


        
        // this.options = options;

        // this.options.formState.mainModel = this.model;
        // riassegna delle funzioni per ora sumExpr che fa una somma di due campi
      
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

}