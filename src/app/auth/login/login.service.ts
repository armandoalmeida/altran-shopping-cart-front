import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Router } from '@angular/router';

import { LoginModel } from './login.model'

@Injectable()
export class LoginService {

  private loginUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loginUrl = env.backEndUrl + '/auth';
    console.log("ENV: " + env.production);
  }

  logon(login: LoginModel): Observable<any> {
    return this.http.post(this.loginUrl, login);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (localStorage['token']) {
      // TODO 
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage['token'])
    return headers;
  }

  getUserInfo() {
    if (this.isLoggedIn()) {
      return JSON.parse(atob(localStorage['token'].split('.')[1]));
    }
  }

}
