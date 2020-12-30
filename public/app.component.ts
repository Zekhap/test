import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from './models/User';
import { AuthService } from './services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API = 'http://localhost:4200/api/';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
    user: User;

    constructor(private router: Router, private authService: AuthService, private http: HttpClient) {
        this.authService.user.subscribe(x => this.user = x);
        if(!this.user) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) return;
            window.scrollTo(0, 0);
        });
    }
}