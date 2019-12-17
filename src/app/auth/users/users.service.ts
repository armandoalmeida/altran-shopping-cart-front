import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../../auth/login/login.service'
import { UserModel } from './users.model'
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrls: string;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.usersUrls = env.backEndUrl + '/users';
  }

  getUserIdUrl():string {
    return `${this.usersUrls}/${this.loginService.getUserInfo().sub}`
  }

  getUserById(): Observable<UserModel>{
    return this.http.get<UserModel>(this.getUserIdUrl(), { headers: this.loginService.getHeaders() });
  }

  saveUser(user: UserModel): Observable<any> {
    return this.http.post(this.usersUrls, user);
  }
  
  updateUser(user: UserModel): Observable<any> {
    return this.http.put(this.getUserIdUrl(), user, { headers: this.loginService.getHeaders() });
  }

}
