import Calculation from './calculation.class';
import {MenuConfig, MenuItem} from "../models";
import CMenu from "./cmenu.class";
import classed from "../utils/classed";
import style from "../utils/style";
import styleSheet from "../utils/styleSheet";
import on from "../utils/on";

export default class Creator {
  private calc: Calculation;
  public anchors: (HTMLAnchorElement & { setDisabled?: Function })[] = [];
  private container: HTMLElement;
  constructor(
    private cMenu: CMenu,
    private config: MenuConfig,
  ) {
    this.container = cMenu.container;
    this.calc = new Calculation(config);
  }

  /** CREATE MENU **/
  public createMenu() {
    const p = this.container;
    classed(p, 'circular-menu', true);
    style(p, 'width', this.calc.menuSize.width!);
    style(p, 'height', this.calc.menuSize.height!);
    style(p, 'margin-top', this.calc.menuSize.marginTop!);
    style(p, 'margin-left', this.calc.menuSize.marginLeft!);
    const self = this;
    on(p, "click", (e: any) => (e.toElement === p) && self.cMenu.hide(), );
    setTimeout(() =>  style(p, 'display', 'block'),100);
    styleSheet(p, 'width', this.calc.coverSize.width!, 'after');
    styleSheet(p, 'height', this.calc.coverSize.height!, 'after');
    styleSheet(p, 'margin-left', this.calc.coverSize.marginLeft!, 'after');
    styleSheet(p, 'margin-top', this.calc.coverSize.marginTop!, 'after');
    styleSheet(p, 'border', "3px solid " + this.config.pageBackground, 'after');
    const ul = p.appendChild(document.createElement('ul'));
    this.createLists(ul);
  }


  /** CREATE LISTS **/
  private createLists (parent: HTMLElement) {
    this.config.menus.forEach((v, k) => {
      this.createList(parent, v, k);
    }, this);
  }
  private createList(
    parent: HTMLElement,
    menuItem: MenuItem,
    index: number
  ){
    const list: HTMLLIElement = document.createElement('li');
    style(list, 'width', this.calc.listSize.width!);
    style(list, 'height', this.calc.listSize.height!);
    style(list, 'transform', 'rotate('+ this.calc.rotateDeg(index) +'deg) skew('+ this.calc.skewDeg +'deg)');
    parent.appendChild(list);
    this.createAnchor(list, menuItem, index);
  }

  /** CREATE ANCHOR **/
  // delayShow reference the last setTimeout triggered by any one of menu item(anchor)
  private delayShow?: number;
  private createAnchor(
    parent: HTMLElement,
    menuItem: MenuItem,
    index: number
  ) {
    const self = this;
    let delayHide: number;// delayHide reference the last setTimeout triggered by the menu item itself
    const a: HTMLAnchorElement & { setDisabled?: Function } = document.createElement('a');
    this.setHref(a, menuItem.href);
    a.setDisabled = () => classed(a, 'disabled', this.ifDisabled(menuItem.disabled));
    this.anchors.push(a);
    style(a, 'width', this.calc.clickZoneSize.width!);
    style(a, 'height', this.calc.clickZoneSize.height!);
    style(a, 'right', this.calc.clickZoneSize.marginRight!);
    style(a, 'bottom', this.calc.clickZoneSize.marginBottom!);
    style(a, 'transform', 'skew(' + -this.calc.skewDeg + 'deg) rotate(' + this.calc.unskewDeg + 'deg) scale(1)');
    classed(a, 'disabled', this.ifDisabled(menuItem.disabled));
    const percent = this.config.percent * 100 + "%";
    styleSheet(a, 'background', 'radial-gradient(transparent ' + percent + ', ' + this.config.background + ' ' + percent + ')');
    styleSheet(a, 'background', 'radial-gradient(transparent ' + percent + ', ' + this.config.backgroundHover + ' ' + percent + ')', 'hover');

    const clickCallBack = (event: MouseEvent, menuItem: MenuItem) => {
      if (menuItem.click) menuItem.click.call(this, event, menuItem);
      if(self.config.hideAfterClick){
        self.cMenu.hide();
        if(self.cMenu.pMenu) self.cMenu.pMenu.hide();
        // if(subMenu) subMenu.hide();
      }
    }

    on(a, 'click', clickCallBack, menuItem);
    parent.appendChild(a);
    this.createHorizontal(a, menuItem, index);

    //toggle subMenu
    if (this.hasSubMenus(menuItem.menus)) {
      const subMenu: CMenu = this.createSubMenu(menuItem.menus!, index);

      on(a, 'mouseenter', () =>
        this.delayShow = setTimeout( () =>
          subMenu
            .styles({
              top: self.container.offsetTop + self.calc.radius + 'px',
              left: self.container.offsetLeft + self.calc.radius + 'px'
            })
            .show()
        , 150)
      );

      on(a, 'mouseleave', (e: any) =>
        (!subMenu.container.contains(e.toElement)) &&
        (delayHide = setTimeout( () => subMenu.hide(), 200))
      );

      on(subMenu.container, 'mouseenter', () => {
        clearTimeout(this.delayShow);
        clearTimeout(delayHide);
      });

      on(subMenu.container, 'mouseleave', (e: any) =>
        (!a.contains(e.toElement) || e.toElement.children[0] === a) && subMenu.hide()
      );
    }
  }
  private hasSubMenus(menus?: MenuItem[]) {
    return !!menus && menus.length !== 0;
  }
  private ifDisabled(disabled: Function | any){
    if(disabled instanceof Function)
      return disabled();
    else
      return Boolean(disabled);
  }

  private setHref(
    a: HTMLAnchorElement,
    href?: string | {url: string, blank: boolean }
  ){
    if (!href) return;
    if (href instanceof Object) {
      a.href = href.url;
      a.target = href.blank? "_blank" : "";
    }
    else a.href = href;
  }


  /** CREATE TEXT **/
  private withIconMarginTop = "3px";
  private withIconTop = "-3px";
  private createText(
    parent: HTMLElement,
    menuItem: MenuItem
  ) {
    const span = document.createElement('span');
    span.textContent = menuItem.title;
    classed(span, 'text', true);
    style(span, 'margin-top', this.hasIcon(menuItem.icon)? this.withIconMarginTop : this.calc.textTop);
    style(span, 'top', this.hasIcon(menuItem.icon)? this.withIconTop : 0);
    parent.appendChild(span);
  }

  /** CREATE HORIZONTAL **/
  private createHorizontal(
    parent: HTMLElement,
    data: MenuItem,
    index: number
  ) {
    const div: HTMLDivElement = document.createElement('div');
    classed(div, "horizontal", true);
    if(this.config.horizontal)
      style(div, 'transform', 'rotate('+ this.calc.horizontalDeg(index) +'deg)');
    parent.appendChild(div);
    this.createIcon(div, data);
    this.createText(div, data);
  }


  /** CREATE ICON **/
  private iconSizeRatio = 0.65;
  private marginTopRatio = 0.2;
  private fontHeight = 13;
  private createIcon(
    parent: HTMLElement,
    data: MenuItem,
  ) {
    if(!this.hasIcon(data.icon)) return;
    const span = document.createElement('span');
    if (data.icon) {
      const [icon,color] = data.icon;
      classed(span, icon + " cm-icon", true);
      if (color) style(span, 'color', color);
    }
    const l = this.calc.clickZoneRadius * this.iconSizeRatio - this.fontHeight + "px",
      m = this.calc.clickZoneRadius * this.marginTopRatio - this.fontHeight + "px";
    style(span, 'width', l);
    style(span, 'height', l);
    style(span, 'font-size', l);
    style(span, 'margin-top', m);
    parent.appendChild(span);
  }
  public hasIcon(icon?: string | [string,string?]){
    if(icon === undefined) return false;
    else if(typeof icon === "string") return icon !== "";
    else return icon.length && icon[0] !== "";
  }


  /** CREATE SUBMENU **/
  private subMenuSizeRatio = 5 / 3;
  private percentRatio = 0.45;
  private centralDegRatio = 0.618;
  private createSubMenu(
    menus: MenuItem[],
    index: number
  ) {
    const subMenu: HTMLDivElement = document.createElement('div');
    classed(subMenu, 'circular-sub-menu', true);
    this.container.parentNode!.insertBefore(subMenu, this.container);
    const totalAngle = this.calc.centralDeg * this.centralDegRatio * menus.length;
    const startDeg = this.calc.rotateDeg(index) - totalAngle / 2 + this.calc.centralDeg / 2;
    return new CMenu(subMenu, {
      ...this.config,
      totalAngle: totalAngle,//deg,
      percent: this.percentRatio,//%
      diameter: this.config.diameter! * this.subMenuSizeRatio,//px
      start: startDeg,//deg
      animation: "into",
      menus
    }, this.cMenu);
  }
}
