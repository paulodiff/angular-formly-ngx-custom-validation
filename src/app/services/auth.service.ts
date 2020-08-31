import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { shareReplay, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

        // console.log('AuthService:contructor', moment().format());

    }
/*
    login(email:string, password:string ) {
        return this.http.post<User>('/api/login', {email, password})
            .do(res => this.setSession) 
            .shareReplay();
    }
 */         
    token : null;
    decodedToken = <any>{};
    expireAt;

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    public getToken(){
      return this.token;
    }

    public setToken(t){
      
      console.log('auth.service.setToken:', t); 
      this.token = t;
      try{
        this.decodedToken  = jwt.decode(t);
        console.log('auth.service.setToken.decoded', this.decodedToken);
        console.log('token:expiresIn:', this.decodedToken.expiresIn);
        // console.log(moment());
        console.log(momentTZ().tz("Europe/Rome").toISOString(true));
        console.log(momentTZ().tz("Europe/Rome").add(this.decodedToken.expiresIn, 'second').toISOString(true));

        this.expireAt = momentTZ().tz("Europe/Rome").add(this.decodedToken.expiresIn, 'second');
        console.log('auth.service.setToken.expireAt', this.expireAt); 
      } catch(err){
        console.log(err);
        this.decodedToken = {};
        this.expireAt = '';
      }
      
     
    }

    public removeToken() {
      this.token = null;
      this.decodedToken = {};
      this.expireAt = '';
    }

/*
    public isLoggedIn() {
        if(this.token) {
          return moment().isBefore(this.getExpiration());
        } else {
          return false;
        }
        
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
*/
    public getTokenExpiration() {
        if(this.token) {
          const expiration = this.expireAt;
          console.log('auth.getTokenExpiration.expiration:', expiration);
          // const expiresAt = JSON.parse(expiration);
          return expiration;
        } else {
          return null;
        }
    }    
}