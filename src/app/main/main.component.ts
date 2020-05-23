import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
    templateUrl: './main.component.html'
})

export class MainComponent implements OnInit, OnDestroy {

    public name = 'PWA Informazioni di PWA';
    public items: any;
    public id;
    public tableName;
    connection;
    message;
  // form Consegna


  constructor(
              private route: ActivatedRoute,
              private _appService: AppService
            ) {

              console.log('PWA:constructor');


  }

  ngOnInit() {

    console.log('Main:ngOnInit');

    // this.id = this.route.snapshot.paramMap.get('id');
    // this.tableName = this.route.snapshot.paramMap.get('tableName');

    this.id = '100';
    this.tableName = 'PWA';

    const opts = {};
    /*
    this._appService.getFakeUsers(opts).subscribe(
      data => {
        console.log(data);
        this.items = data;
      },
      err => console.log(err),
      () => console.log('PWA:getFakeUsers')
    );
    */


    /*
    if (this.id) {
      console.log(this.id);
      this.name = this.name + ' registrazione numero: ' +  this.id;
      let opts = {tblName : this.tableName, tblId : this.id };
      this._appService.getFakeUsers(opts).subscribe(
        data => { 
          console.log(data);
          this.items = data;
        },
        err => console.log(err),
        () => console.log('PWA:getFakeUsers')
      );
    }
    */

    /*
    this.connection = this._socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
    */
  }

  ngOnDestroy() {
    // this.connection.unsubscribe();
  }

}