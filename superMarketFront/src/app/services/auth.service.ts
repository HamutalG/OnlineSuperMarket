import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from '../../models/account';
import { Observable } from 'rxjs';
import { Login } from '../../models/login';

const jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  server = "/users/";

  public inSessionEmitter: EventEmitter<any> = new EventEmitter<any>();
  public idEmitt: EventEmitter<any> = new EventEmitter<any>();

  public isAuth: boolean = false;
  public user: Account;
  constructor(private http: HttpClient) { }

  public addAccount(account: Account): Observable<Account> {
    return <Observable<Account>>this.http.post(this.server + 'register', account, jsonHeader);
  }

  public loginUser(login: Login): Observable<any> {
    return <Observable<any>>this.http.post(this.server + 'login', login, jsonHeader);
  }

  public handleInSessionEmitter(account: any) {
    if ((account !== null)?
       (!account.hasOwnProperty("msg") && !account.hasOwnProperty("hasError")): false) {
      this.idEmitt.emit(account.ID);
      this.isAuth = true;
      this.user = account;
      this.inSessionEmitter.emit(account);
    }
    else {
      this.inSessionEmitter.emit(undefined);
    }
  }

  public subscribableSessionCheck() {
    return new Promise(resolve => {
      this.checkSession().subscribe(response => {
       
        this.handleInSessionEmitter(response);
        setTimeout(() => resolve(null), 0);
      });
    });
  }

  public checkSession(): Observable<any> {
    return this.http.get(this.server + 'checkSession');
  }

  public handleLogout(): Observable<any> {
    this.isAuth = false;
    return <Observable<any>>this.http.get(this.server + 'logout');
  };



}
