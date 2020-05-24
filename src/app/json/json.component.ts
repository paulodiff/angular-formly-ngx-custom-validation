import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';

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
    form = new FormGroup({});
    options: FormlyFormOptions = {};

    model;
    fields: FormlyFieldConfig[];



  constructor(
              private route: ActivatedRoute,
              private _appService: AppService
            ) {

              console.log('Json:constructor');


  }

  ngOnInit() {

    console.log('Json:ngOnInit');

    this.itemId = this.route.snapshot.paramMap.get('itemId');
    console.log('Json:itemId', this.itemId);
    // this.tableName = this.route.snapshot.paramMap.get('tableName');

  
    

    this.tableName = 'PWA';

    const opts = {};
    
    this._appService.getUserData().subscribe(([model, fields]) => {
        console.log('returned...');
        this.model = model;
        this.fields = fields;

        this.options.formState.mainModel = this.model;
        this.fields = fields.map(f => {
          if (f.templateOptions && f.templateOptions.sumExpr) {
            console.log('json:assign:change:function',f.templateOptions.changeExpr);
            f.templateOptions.change = 
            // Function('field', f.templateOptions.changeExpr).bind(this);
            Function('field', 'this.sumOnChange(field)').bind(this);
          }
          return f;
        });

      },
      err => {
        console.log('errore:');
        console.log(err);},
      () => console.log('PWA:getFakeUsers')
    );
    
  }

  nameVal(field)  {
    console.log('nameVal');
    console.log('checking name');
  }

  sumOnChange(field) {
    // console.log('nameChange');
    console.log('sumOnChange', field.key);
    console.log('sumOnChange', field.templateOptions);
    console.log('sumOnChange', field.parent.formControl.controls["mac"].setValue("ss"));
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
  }

}