import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { shareReplay, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';

const CACHE_SIZE = 1;

@Injectable()
export class AppService {
    // http options used for making API calls
    private httpOptions: any;
    public errorMsg: {};
    public errors: any = [];
    configUrl = 'https://jsonplaceholder.typicode.com/users';
    constructor(private http: HttpClient) {

      console.log('APP_SERVICE:build:contructor');

      this.httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    }

  getStats(options) {
    // get info log di una registrazione
    console.log('APP_SERVICE:getStats');
    let Params = new HttpParams();
    Params = Params.append('anno', options.anno);
    // Params = Params.append('tblId', options.tblId);
    // console.log(options);
    // console.log(JSON.stringify(options));
    return this.http.get(environment.apiStats, { params: Params, headers: this.httpOptions.headers } );
  }

  getFormData(formId): Observable<any> {
    console.log('..getFormData...', formId);
    return forkJoin([
      this.getModel(formId), 
      this.getFields(formId),
      this.getOptions(formId)
      ]);
  }

  getModel(formId) {
    console.log('..getModel..',formId);
    let asset = 'assets/json-powered/' + formId + '-model.json';
    return this.http.get<{ firstName: string, lastName: string }>(asset);
  }

  getFields(formId) {
     console.log('..getFields..',formId);
     let asset = 'assets/json-powered/' + formId + '-form.json';
    return this.http.get<FormlyFieldConfig[]>(asset);
  }

  getOptions(formId) {
     console.log('..getOptions..',formId);
     let asset = 'assets/json-powered/' + formId + '-options.json';
    return this.http.get<FormlyFieldConfig[]>(asset);
  }

}