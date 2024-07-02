//menu.service.ts
import {ElementRef, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {MenuConfig, MenuItem} from "./models";
import {takeUntil} from "rxjs/operators";
import CMenu from "./classes/cmenu.class";
import {Click} from "./models";


@Injectable({  providedIn: 'root' })
export class NgxRadialMenuService {
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
  ): CMenu {
    let menu = new CMenu(menuElement.nativeElement, {...menuConfig, menus});
    menu.observables = menus.map(menu => this.registerMenuItem(menu));
    menu.observables.map((obs: Observable<Click>) =>
      obs.subscribe(({event,handler}) => {
        if (handler) handler(event, menu.data);
      }));
    return menu;
  }
}
