import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
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
    console.log('AppService:getFormData:', formId);
    return forkJoin([
      this.getModel(formId), 
      this.getFields(formId),
      this.getOptions(formId)
      ]);
  }

  getModel(formId) {
    let asset = 'assets/json-powered/' + formId + '-model.json';
    console.log('AppService:getModel:',asset);
    return this.http.get<{ firstName: string, lastName: string }>(asset);
  }

  getFields(formId) {
     
     let asset = 'assets/json-powered/' + formId + '-form.json';
     console.log('AppService:getFields:',asset);
    return this.http.get<FormlyFieldConfig[]>(asset);
  }

  getOptions(formId) {
     
     let asset = 'assets/json-powered/' + formId + '-options.json';
     console.log('AppService:getOptions:',asset);
    return this.http.get<FormlyFieldConfig[]>(asset);
  }

  // upload data ....
  uploadData(fData, fOptions) {
    

    var SERVER_URL = 'https://ISTANZESERVERV2.paulodiff.repl.co/upload';

    console.log('service-upload-data', SERVER_URL);
    /*
    return this.http.post<any>(SERVER_URL, fData, {
      reportProgress: true,
      observe: 'events'
    });
    */

    console.log(fOptions);

/*
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'my-auth-token'
    });
*/
     let httpHeaders = new HttpHeaders({
	    Authorization: 'my-auth-token'
     });    

     let options = {
	      headers: httpHeaders,
        reportProgress : true,
        observe: 'events'
     }; 

    const  headers1 = new  HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");

// const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
const headers = new HttpHeaders().set('Authorization', 'Bearer my-token')
return this.http.post<any>(SERVER_URL, fData, {headers : headers1});

/*

    return this.http.post<any>(SERVER_URL, fData, {
      headers: headers1,
      reportProgress: true,
      observe: "events"
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;

        default:
          return `Unhandled event: ${event.type}`;

      }
    })
    );
    */
  }
  

}