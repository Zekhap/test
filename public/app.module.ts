import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Layout
import { DefaultLayoutComponent, CenterLayoutComponent } from './containers';

//Pages without children
import { P404Component } from './views/error/404/404.component';



const APP_CONTAINERS = [
    DefaultLayoutComponent,
    CenterLayoutComponent
];

import {
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from './components';


import { AppRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './helpers';
import { AuthService } from './services';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        AppHeaderModule,
        AppFooterModule,
        AppSidebarModule,
    ],
    declarations: [AppComponent, ...APP_CONTAINERS, P404Component],
    providers: [{
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}