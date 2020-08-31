import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { shareReplay, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as jwt_decode from "jwt-decode";
import * as moment from "moment";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

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

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    public setToken(t){
      this.token = t;
      this.decodedToken = jwt_decode(t); 
      console.log('auth.service.setToken:',token'); 
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        if(this.token && )
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}