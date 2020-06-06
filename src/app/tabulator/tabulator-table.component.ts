import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { AppService } from '../services/app.service';

/**
 * This is a wrapper class for the tabulator JS library.
 * For more info see http://tabulator.info
 */
@Component({
  selector: 'app-tabulator-table',
  templateUrl: './tabulator-table.component.html',
  styleUrls: ['./tabulator-table.component.css']
})
export class TabulatorTableComponent implements OnChanges {
  @Input() tableData: any[] = [];
  @Input() columnNames: any[] = [];
  @Input() height: string = '311px';
  // list properties you want to set per implementation here...

  tab = document.createElement('div');
  model;
  fields;
  options;

  constructor(private _appService: AppService) {
    //var Tabulator = require('tabulator-tables');

      console.log('Tabulator:init');
       // In a real app: dispatch action to load the details here.
      this._appService.getFormData('tabulator').subscribe(([model, fields, options ]) => {
        console.log('returned...');
        // this.options = {};
        this.model = {};
        this.fields = null;
        this.model = model;
        this.tableData = fields;
        // this.options = options;

       
      },
      err => {
        console.log('errore:');
        console.log(err);},
      () => console.log('Tabulator:getData:done!')
      );
  }


  

  ngOnChanges(changes: SimpleChanges): void {
    this.drawTable();
  }

  private drawTable(): void {
    new Tabulator(this.tab, {
      data: this.tableData,
      autoColumns:true,
      reactiveData:true, //enable data reactivity
      // columns: this.columnNames,
      layout: 'fitData',
      height: this.height
    });
    document.getElementById('my-tabular-table').appendChild(this.tab);
  }
}