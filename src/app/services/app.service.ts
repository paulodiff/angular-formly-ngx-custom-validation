import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { shareReplay, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../services/auth.service';


// const CACHE_SIZE = 1;

@Injectable()
export class AppService {
    // http options used for making API calls
    private httpOptions: any;
    public errorMsg: {};
    public errors: any = [];
    configUrl = 'https://jsonplaceholder.typicode.com/users';
    constructor(
      private http: HttpClient,
      private authService: AuthService) {

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

  getCfg(cfgId) {
    let asset = 'assets/json-powered/cfg-' + cfgId + '.json';
    console.log('AppService:getCfg:',asset);
    return this.http.get<FormlyFieldConfig[]>(asset);
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

  getMe() {
     var SERVER_URL = 'https://ISTANZESERVERV2.paulodiff.repl.co/me';
     // let asset = 'assets/json-powered/' + formId + '-options.json';
     let asset = SERVER_URL;
     console.log('AppService:getMe:',asset);
     // let Params = new HttpParams();
     // Params = Params.append('anno', '2020');
     // this.httpOptions.headers.append('Authorization', 'Basic username:password');

    let headers = new HttpHeaders(
      { 
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'content-type': 'application/json'
      });
    //console.log(headers);
 


    // let headers = new Headers();
    // headers.append('Authorization', 'Basic username:password');
    // return this.http.get(asset, { params: Params, headers: headers } );
    return this.http.get(asset, { headers: headers } );
    //return this.http.get<any>(asset);
  }

  getAuthUrl() {
     var SERVER_URL = 'https://ISTANZESERVERV2.paulodiff.repl.co/getGatewayUrl';
     // let asset = 'assets/json-powered/' + formId + '-options.json';
     let asset = SERVER_URL;
     console.log('AppService:getAuthUrl:',asset);
     let Params = new HttpParams();
     Params = Params.append('anno', '2020');
     this.httpOptions.headers.append('Authorization', 'Basic username:password');

    let headers = new HttpHeaders({ 'Authorization': 'Bearer aaaa','content-type': 'application/json'}  )
    //console.log(headers);
 


    // let headers = new Headers();
     // headers.append('Authorization', 'Basic username:password');
     return this.http.get(asset, { params: Params, headers: headers } );
     //return this.http.get<any>(asset);
  }

  // upload data ....
  uploadData(fData, fOptions) {
    

    var SERVER_URL = 'https://ISTANZESERVERV2.paulodiff.repl.co/upload/dinpi01';

    // httpbin.org
    // curl -X POST "https://httpbin.org/anything" -H "accept: application/json"

    // SERVER_URL = "https://httpbin.org/anything"

    console.log('service-upload-data', SERVER_URL);
  

    console.log(fOptions);


// const headers = new HttpHeaders().set('Authorization', 'Bearer my-token')


    return this.http.post<any>(SERVER_URL, fData, {
      // headers: headers,
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
    
  }
  

}