//menu.service.ts
import {ElementRef, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Menu, MenuConfig, MenuItem} from "./models";
import {takeUntil} from "rxjs/operators";

declare var CMenu: any;

@Injectable({  providedIn: 'root' })
export class MenuService {
  private destroy$: Subject<boolean> = new Subject();
  public destroy() { this.destroy$.next(true) }

  private clickSubject: Subject<void> = new Subject<void>();
  public click$: Observable<void> = this.clickSubject.asObservable()
    .pipe(takeUntil(this.destroy$));
  public click() { this.clickSubject.next() }

  private defaultMenuConfig: MenuConfig = {
    background: '#99AABBCC',
    diameter: 300,
    menus: []
  }

  private registerMenuItem(menu: MenuItem) {
    let subject: Subject<{event: MouseEvent, click?: Function}> = new Subject();
    let click = menu.click;
    menu.click = (event: MouseEvent) => subject.next({event, click});
    return subject.asObservable().pipe(takeUntil(this.destroy$));
  }

  public generateMenu(menuElement: ElementRef, menus: MenuItem[], menuConfig: MenuConfig = this.defaultMenuConfig): Menu {
    let menu = new CMenu(menuElement.nativeElement).config({...menuConfig, menus});
    menu.observables = menus.map(menu => this.registerMenuItem(menu));
    menu.data = {};
    menu.observables.map((obs: Observable<{event: MouseEvent, click?: Function}>) =>
      obs.subscribe(({event,click}) => {
        if (click) click(event, menu.data);
      }));
    return menu;
  }
}
