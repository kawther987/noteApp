import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.setUserToken();
  }

  setUserToken() {
    if (localStorage.getItem('uToken') != null) {
      this.decodeToken();
    }
  }

  signUp(userData: UserData): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}signUp`, userData);
  }

  signIn(userData: UserData): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}signIn`, userData);
  }

  logOut(): void {
    this.userInfo.next(null);
    localStorage.removeItem('uToken');
    // localStorage.removeItem('uName');
    this._Router.navigate(['/login']);
  }

  decodeToken(): void {
    let encode = JSON.stringify(localStorage.getItem('uToken'));
    let decode = jwtDecode(encode);
    this.userInfo.next(decode);
  }
}
