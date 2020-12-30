import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthRoutingModule } from '../auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ LoginComponent ]
})
export class LoginModule { }