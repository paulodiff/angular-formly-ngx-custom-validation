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

  getUserData(): Observable<any> {
    console.log('..getUserData...');
    return forkJoin([this.getModel(), this.getFields()]);
  }

  getModel() {
    console.log('..getModel..');
    return this.http.get<{ firstName: string, lastName: string }>('assets/json-powered/user-model.json');
  }

  getFields() {
     console.log('..getFields..');
    return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form.json');
  }

}