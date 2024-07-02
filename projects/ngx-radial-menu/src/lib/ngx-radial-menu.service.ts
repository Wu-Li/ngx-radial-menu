//menu.service.ts
import {ElementRef, Injectable, Renderer2} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Click, MenuConfig, MenuItem} from "./models";
import {takeUntil} from "rxjs/operators";
import {NgxRadialMenuComponent} from "./ngx-radial-menu.component";


@Injectable({  providedIn: 'root' })
export class NgxRadialMenuService {
  constructor(
    private renderer: Renderer2,
  ) {  }

  private destroy$: Subject<boolean> = new Subject();
  public destroy() { this.destroy$.next(true) }

  private clickSubject: Subject<void> = new Subject<void>();
  public click$: Observable<void> = this.clickSubject.asObservable()
    .pipe(takeUntil(this.destroy$));
  public click() { this.clickSubject.next() }

  private defaultMenuConfig: Partial<MenuConfig> = {
    background: '#99AABBCC',
    diameter: 300,
    menus: []
  }

  private registerMenuItem(menu: MenuItem) {
    let subject: Subject<Click> = new Subject();
    let handler = menu.click;
    menu.click = (event: MouseEvent) => subject.next({event, handler});
    return subject.asObservable().pipe(takeUntil(this.destroy$));
  }

  public generateMenu(
    menuElement: ElementRef,
    menus: MenuItem[],
    menuConfig: Partial<MenuConfig> = this.defaultMenuConfig
  ): NgxRadialMenuComponent {
    let menu = new NgxRadialMenuComponent(this.renderer);
    menu.initialize(menuElement.nativeElement, {...menuConfig, menus})
    menu.observables = menus.map(menu => this.registerMenuItem(menu));
    menu.observables.map((obs: Observable<Click>) =>
      obs.subscribe(({event,handler}) => {
        if (handler) handler(event, menu.data);
      }));
    return menu;
  }
}
