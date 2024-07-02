import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Click, Coordinates, defaultConfig, MenuConfig, MenuItem, Style} from "./models";
import {Observable} from "rxjs";
import Calculation from "./classes/calculation.class";
import {AfterDirective} from "./directives/after.directive";

@Component({
  selector: 'ngx-radial-menu',
  standalone: true,
  imports: [
    AfterDirective
  ],
  templateUrl: './ngx-radial-menu.component.html',
  styleUrls: ['./ngx-radial-menu.component.css'],
})
export class NgxRadialMenuComponent {
  @ViewChild('menuElement', { static: false }) menuElement!: ElementRef;
  @Input('menu') menu?: MenuItem;

  public container!: HTMLElement;
  public pMenu?: NgxRadialMenuComponent;
  public calc!: Calculation;
  public config!: MenuConfig;
  public percent!: string;
  public observables: Observable<Click>[] = [];
  public data: Object = {};

  constructor(
    private renderer: Renderer2,
  ){}

  public initialize(
    container: HTMLElement,
    config: Partial<MenuConfig>,
    pMenu?: NgxRadialMenuComponent
  ) {
    this.container = container;
    this.config = {...defaultConfig, ...config};
    this.percent = (this.config.percent * 100) + '%';
    this.calc = new Calculation(this.config);
    this.pMenu = pMenu;
    setTimeout(() => this.renderer.setStyle(this.menuElement.nativeElement, 'display', 'block'),100);
    return this;
  }

  public setConfig(config: Partial<MenuConfig>){
    this.config = {...defaultConfig, ...config};
  }

  //Show
  public show(coordinates?: Coordinates) {
    if (coordinates) this.setCoordinate(coordinates);
    this.renderer.addClass(this.container, 'opened-nav');
  }
  private setCoordinate(coordinate: Coordinates){
    this.renderer.setStyle(this.container,'left',coordinate.x+'px');
    this.renderer.setStyle(this.container,'top',coordinate.y+'px');
  }

  //Hide
  public hide() {
    this.renderer.removeClass(this.container, 'opened-nav');
  }

  //Styles
  public styles(styles: Style) {
    Object.entries(styles).forEach(([k,v]) =>
      this.renderer.setStyle(this.container,k,v))
  }

  //Click Callbacks
  public menuItemClick(event: MouseEvent, menuItem: MenuItem){
    if (menuItem.click) menuItem.click.call(this, event, menuItem);
    if(this.config.hideAfterClick){
      this.hide();
      if(this.pMenu) this.pMenu.hide();
    }
  }
}
