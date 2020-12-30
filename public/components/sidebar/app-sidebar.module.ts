import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSidebarComponent } from './app-sidebar.component';
import { SidebarNavHelper } from './app-sidebar.service';
import { AppSidebarItemsComponent } from './items/app-sidebar-items.component';
@NgModule({
  imports: [ 
        CommonModule,
        RouterModule
    ],
    exports: [ 
        AppSidebarComponent,
        AppSidebarItemsComponent
    ],
    declarations: [
      AppSidebarComponent,
      AppSidebarItemsComponent
    ],
    providers: [
        SidebarNavHelper
    ]
})
export class AppSidebarModule {}