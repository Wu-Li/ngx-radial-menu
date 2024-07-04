import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Click, Coordinates, defaultConfig, MenuConfig, MenuItem} from "./models";
import Calculation from "./classes/calculation.class";
import {AfterDirective} from "./directives/after.directive";
import {MatIconModule} from "@angular/material/icon";
import {NgxRadialMenuService} from "./ngx-radial-menu.service";
import {CommonModule} from "@angular/common";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'ngx-radial-menu',
  standalone: true,
  imports: [
    AfterDirective,
    CommonModule,
    MatIconModule
  ],
  providers: [
    NgxRadialMenuService
  ],
  templateUrl: './ngx-radial-menu.component.html',
  styleUrls: ['./ngx-radial-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxRadialMenuComponent implements OnInit,OnDestroy {
  protected readonly clearTimeout = clearTimeout;

  @ViewChild('menuElement', { static: false }) menuElement!: ElementRef;
  @Input('config') menuConfig?: Partial<MenuConfig>;
  @Input('parentMenu') parentMenu?: NgxRadialMenuComponent;
  @Input('parentMenuItem') parentMenuItem?: MenuItem;

  public config!: MenuConfig;
  public calc!: Calculation;
  public observables: Observable<Click>[] = [];
  public coordinates: Coordinates = {x:0,y:0};
  public menuOpen: boolean = false;
  public delayShow: any;
  public delayHide: any;
  public menus: MenuItem[] = [];


  constructor(
    private menuService: NgxRadialMenuService
  ){}

  ngOnInit() {
    this.config = {...defaultConfig, ...this.menuConfig};
    this.calc = new Calculation(this.config);
    this.observables = this.config.menus.map(menu => this.menuService.registerMenuItem(menu));
    this.observables.map((obs: Observable<Click>) =>
      obs.pipe(takeUntil(this.destroy$)).subscribe(
        ({event,handler, data}) => {
        if (handler) handler(event, data);
      }));
    if (this.parentMenuItem)
      this.parentMenuItem.subMenu = this;
  }

  private destroy: Subject<void> = new Subject();
  private destroy$: Observable<void> = this.destroy.asObservable();
  ngOnDestroy = this.destroy.next;

  /** Menu Visibility **/
  public show(coordinates: Coordinates, data?: any, disable?: string[]) {
    if (data) this.menuService.data = data;
    this.menus = this.filterDisabledMenus(this.config.menus, disable);
    if (disable && disable.length > 0)
      this.calc.calculate(this.menus.length);
    this.coordinates = {x:coordinates.x-40,y:coordinates.y};
    this.menuOpen = true;
  }
  public filterDisabledMenus(menus: MenuItem[], disable?: string[]) {
    if (!disable || disable.length == 0) return menus;
    return menus
      .filter((menuItem) => !disable?.includes(menuItem.title))
      .map((menuItem) => {
        if (menuItem.menus?.length) {
          const disabledSubs = disable
            .filter(disPath => disPath.startsWith(menuItem.title) && disPath != menuItem.title)
            .map(disPath => disPath.slice(disPath.indexOf('.') + 1));
          menuItem.menus = this.filterDisabledMenus(menuItem.menus, disabledSubs)
        }
        return menuItem;
      });
  }
  public hide() {
    Object.values(this.menus).map(menu => menu.subMenu?.hide());
    delete this.menuService.data;
    this.menus = [];
    this.menuOpen = false;
  }

  /** Anchors **/
  public menuItemClick(event: MouseEvent, menuItem: MenuItem){
    if (menuItem.click) menuItem.click.call(this, event, menuItem);
    if(this.config.hideAfterClick){
      this.hide();
      if(this.parentMenu) this.parentMenu.hide();
    }
  }
  public ifDisabled(disabled: boolean | Function | undefined) {
    if (disabled instanceof Function) return disabled();
    else return !!disabled;
  }

  /** Submenus **/
  private subMenuSizeRatio = 5 / 3;
  private percentRatio = 0.45;
  private centralDegRatio = 0.618;
  public subMenuConfig(parent: MenuItem, index: number){
    const totalAngle = this.calc.centralDeg * this.centralDegRatio * parent.menus!.length;
    const start = this.calc.rotateDeg(index) - totalAngle / 2 + this.calc.centralDeg / 2;
    return {
      ...this.config,
      totalAngle,
      start,
      percent: this.percentRatio,
      diameter: this.config.diameter * this.subMenuSizeRatio,
      animation: "into",
      menus: parent.menus
    }
  }

  onMouseEnter($event: MouseEvent, menuItem: MenuItem) {
    this.delayShow = setTimeout(() => {
      Object.values(this.config.menus).map(menu => menu.subMenu?.hide());
      let coordinates = {
        x:this.menuElement.nativeElement.offsetLeft+40 + this.calc.radius,
        y:this.menuElement.nativeElement.offsetTop + this.calc.radius
      }
      menuItem.subMenu?.show(coordinates);
    }, 150);
  }

  onMouseLeave(e: MouseEvent, menuItem: MenuItem): void {
    if (!menuItem.subMenu) return;
    const parentEl = menuItem.subMenu.menuElement.nativeElement.parentElement;
    if (!parentEl.contains(e.relatedTarget)) {
      this.delayHide = setTimeout(() => {
        menuItem.subMenu?.hide();
      }, 200);
    }
  }

  protected readonly Object = Object;
}

