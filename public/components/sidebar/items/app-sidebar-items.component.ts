import {Component, Inject, Input, Renderer2, OnDestroy, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {INavData} from './../app-sidebar-nav';
import {SidebarNavHelper} from './../app-sidebar.service';

@Component({
    selector: 'app-sidebar-items',
    template: `
    <li *ngFor="let item of items" [ngSwitch]="helper.itemType(item)" [ngClass]="helper.itemType(item)">
        <span *ngSwitchCase="'divider'">{{item.name}}</span>
        <span *ngSwitchCase="'title'">{{item.name}}</span>

        <span *ngSwitchCase="'dropdown'" class="ARROW" (click)="toggleClass($event)">
            <a>
                <i *ngIf="helper.hasIcon(item)" [ngClass]="item.icon"></i>
                <span>{{item.name}}</span>
            </a>
        </span>
        <ul *ngSwitchCase="'dropdown'">
            <li *ngFor="let child of item.children" [ngSwitch]="helper.itemType(child)">
                <a [href]="child.url">
                    <i *ngIf="helper.hasIcon(child)" [ngClass]="child.icon"></i>
                    <span>{{child.name}}</span>
                </a>
            </li>
        </ul>

        <a *ngSwitchDefault [href]="item.url">
            <i *ngIf="helper.hasIcon(item)" [ngClass]="item.icon"></i>
            <span>{{item.name}}</span>
        </a>
    </li>
    `
})

export class AppSidebarItemsComponent implements OnInit, OnDestroy, OnChanges {

    protected _items: INavData[];
    @Input() navItems: INavData[] = [];
    
    get items(): INavData[] {
        return this._items;
    }

    constructor(
        @Inject(DOCUMENT) private document: any,
        private renderer: Renderer2,
        public router: Router,
        public helper: SidebarNavHelper
    ) { }

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this._items = Array.isArray(this.navItems) ? this.navItems.slice() : [];
    }

    toggleClass(e) {
        const classList = e.target.parentElement.parentElement.classList;
        const classes = e.target.parentElement.parentElement.className;
        classes.includes('open') ? classList.remove('open') : classList.add('open');
      }
}