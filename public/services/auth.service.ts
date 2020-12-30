
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'public/models/User';
import { map } from 'rxjs/operators';
import * as moment from "moment";
import { Router } from '@angular/router';
import { environment } from '../environment';

const USER_KEY = "user";
  
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(USER_KEY)));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}auth/login`, { username, password }, { withCredentials: true, headers: {'Content-Type': 'application/json'} })
            .pipe(map(user => {
                this.userSubject.next(user);
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                this.startRefreshTokenTimer();
                return user;
            })); 
    }

    logout() {
        //this.http.post<any>(`${environment.apiUrl}auth/logout`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        localStorage.removeItem(USER_KEY);
        this.router.navigate(['/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${environment.apiUrl}auth/refresh`, {}, { withCredentials: true, headers: {'Content-Type': 'application/json'} })
            .pipe(map((user) => {
                this.userSubject.next(user);
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}