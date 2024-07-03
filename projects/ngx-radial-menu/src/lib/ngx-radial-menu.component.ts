import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {Click, Coordinates, defaultConfig, MenuConfig, MenuItem} from "./models";
import Calculation from "./classes/calculation.class";
import {AfterDirective} from "./directives/after.directive";
import {MatIconModule} from "@angular/material/icon";
import {NgxRadialMenuService} from "./ngx-radial-menu.service";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'ngx-radial-menu',
  standalone: true,
  imports: [
    AfterDirective,
    MatIconModule,
    CommonModule
  ],
  providers: [
    NgxRadialMenuService
  ],
  templateUrl: './ngx-radial-menu.component.html',
  styleUrls: ['./ngx-radial-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxRadialMenuComponent implements OnInit {
  @ViewChild('menuElement', { static: false }) menuElement!: ElementRef;
  @Input('config') menuConfig?: Partial<MenuConfig>;
  @Input('parentMenu') parentMenu?: NgxRadialMenuComponent;

  public config!: MenuConfig;
  public calc!: Calculation;
  public percent!: string;
  public observables: Observable<Click>[] = [];
  public data: Object = {};
  public coordinates: Coordinates = {x:0,y:0};
  public menuOpen: boolean = false;

  constructor(
    private menuService: NgxRadialMenuService
  ){}

  ngOnInit() {
    this.config = {...defaultConfig, ...this.menuConfig};
    this.percent = (this.config.percent * 100) + '%';
    this.calc = new Calculation(this.config);
    this.observables = this.config.menus.map(menu => this.menuService.registerMenuItem(menu));
    this.observables.map((obs: Observable<Click>) =>
      obs.subscribe(({event,handler}) => {
        if (handler) handler(event, this.data);
      }));
  }

  /** Menu Visibility **/
  public show(coordinates: Coordinates) {
    this.coordinates = coordinates;
    this.menuOpen = true;
  }
  public hide() {
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
  //Should be inserted before parent container? How?
  public subMenuConfig(menus: MenuItem[], index: number){
    const totalAngle = this.calc.centralDeg * this.centralDegRatio * menus.length;
    const start = this.calc.rotateDeg(index) - totalAngle / 2 + this.calc.centralDeg / 2;
    return {
      ...this.config,
      totalAngle,
      start,
      percent: this.percentRatio,
      diameter: this.config.diameter * this.subMenuSizeRatio,
      animation: "into",
      menus
    }
  }
}

