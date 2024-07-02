import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Click, Coordinates, defaultConfig, MenuConfig, MenuItem} from "./models";
import Calculation from "./classes/calculation.class";
import {AfterDirective} from "./directives/after.directive";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'ngx-radial-menu',
  standalone: true,
  imports: [
    AfterDirective,
    MatIconModule
  ],
  templateUrl: './ngx-radial-menu.component.html',
  styleUrls: ['./ngx-radial-menu.component.css'],
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

  constructor(
    private renderer: Renderer2,
  ){}

  ngOnInit() {
    this.config = {...defaultConfig, ...this.menuConfig};
    this.percent = (this.config.percent * 100) + '%';
    this.calc = new Calculation(this.config);
  }

  /** Menu Visibility **/
  public show(coordinates?: Coordinates) {
    if (coordinates) this.setCoordinate(coordinates);
    this.renderer.addClass(this.menuElement, 'opened-nav');
  }
  private setCoordinate(coordinate: Coordinates){
    this.renderer.setStyle(this.menuElement,'left',coordinate.x+'px');
    this.renderer.setStyle(this.menuElement,'top',coordinate.y+'px');
  }
  public hide() {
    this.renderer.removeClass(this.menuElement, 'opened-nav');
  }

  /** Anchors **/
  public menuItemClick(event: MouseEvent, menuItem: MenuItem){
    if (menuItem.click) menuItem.click.call(this, event, menuItem);
    if(this.config.hideAfterClick){
      this.hide();
      if(this.parentMenu) this.parentMenu.hide();
    }
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
