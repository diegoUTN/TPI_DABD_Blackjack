import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = {} as User;
  apiUrlBase: string = environment.userBaseUrl;

  constructor(private http: HttpClient,
    private router : Router) { }

  createUser(user: string, pass: string): Observable<any> {
    const comando = {
      "username": user,
      "password": pass
    }
    const url = this.apiUrlBase + "/user";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url, body, { 'headers': headers })
  }

  postLogin(user: string, pass: string): Observable<any> {
    const comando = {
      "username": user,
      "password": pass
    }
    const url = this.apiUrlBase + "/user/login";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url, body, { 'headers': headers })
  }

  setToken(token: string, username : string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
  }

  getToken() : any {
    return localStorage.getItem('token');
  }

  getUser() : any {
    return localStorage.getItem('user');
  }

}
