import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Tabulator from 'tabulator-tables';
import * as XLSX from 'xlsx';
import { AppService } from '../services/app.service';

/**
 * This is a wrapper class for the tabulator JS library.
 * For more info see http://tabulator.info
 */
@Component({
  selector: 'app-tabulator-table',
  templateUrl: './tabulator-table.component.html'
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
  table;

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
        this.columnNames = model;
        this.tableData = fields;
        // this.options = options;

        this.drawTable();

        /* generate worksheet */
        // const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.model);

       
      },
      err => {
        console.log('errore:');
        console.log(err);},
      () => console.log('Tabulator:getData:done!')
      );
  }


  

  ngOnChanges(changes: SimpleChanges): void {
    // this.drawTable();
  }

  private drawTable(): void {
    this.table = new Tabulator(this.tab, {
      data: this.tableData,
      // autoColumns: true,
      // headerVertical: true,
      layout:"fitColumns",
      // reactiveData:true, //enable data reactivity
      columns: this.columnNames,
      // layout: 'fitData',
      // height: this.height
    });
    document.getElementById('my-tabular-table').appendChild(this.tab);

 
  }

  downloadCSV() {

    console.log('download...');
    this.table.download("csv", "data.csv");

  }

}