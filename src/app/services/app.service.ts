import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, forkJoin } from 'rxjs';
import { shareReplay, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';

const CACHE_SIZE = 1;

@Injectable()
export class AppService {
    // http options used for making API calls
    private httpOptions: any;
    
    // the actual JWT token
    public token: string;
    // the token expiration date
    public token_expires: Date;
    // the username of the logged in user
    public username: string;
    public isAdmin: Boolean;

    public carrello: any = [];
    public errorMsg: {};

    // error messages received from the login attempt
    public errors: any = [];
    configUrl = 'https://jsonplaceholder.typicode.com/users';
    constructor(private http: HttpClient) {

      console.log('APP_SERVICE:build');

      this.httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
      };

        // TO REMOVE
      this.username = 'USER_TEST';
    }

 
    // --------------------- ATTI ---------------------------------



    private cacheConsegnatari: any[];


    getInfoIstanza(options) {
      // Begin assigning parameters
      console.log('APP_SERVICE:getInfoIstanza');
      let Params = new HttpParams();
      console.log(options);
      const apiUrl = environment.apiIstanzeRecuperaImpostazioni + '/' + options.istanzaId;
      console.log(apiUrl);
      // Params = Params.append('istanzaId', options.istanzaId);
      // Params = Params.append('nominativo', options.nominativo);
      // Params = Params.append('cronologico', options.cronologico);
      // Params = Params.append('maxnumrighe', options.maxnumrighe);
      console.log(JSON.stringify(options));
      return this.http.get(apiUrl, { params: Params, headers: this.httpOptions.headers } );
    }


    

  // STATISTICHE --------------------------------------------------------

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

  getStatus() {
    console.log('APP_SERVICE:getStatus');
    const sseUrl = environment.apiInfo;
    console.log(sseUrl);
    return this.http.get(sseUrl, { headers: this.httpOptions });
  }

  getUserData(): Observable<any> {
    console.log('..getUserData...');
    return forkJoin([this.getUser(), this.getFields()]);
  }

  getUser() {
    return this.http.get<{ firstName: string, lastName: string }>('assets/json-powered/user.json');
  }

  getFields() {
    return this.http.get<FormlyFieldConfig[]>('assets/json-powered/user-form.json');
  }

}