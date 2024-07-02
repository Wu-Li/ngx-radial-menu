import Creator from "./creator.class";
import {Click, Coordinates, defaultConfig, MenuConfig, Style} from "../models";
import style from "../utils/style";
import classed from "../utils/classed";
import {Observable} from "rxjs";

export default class CMenu {
  private creator: Creator;
  private config!: MenuConfig;
  public observables: Observable<Click>[] = [];
  public data: Object = {};

  constructor(
    public container: HTMLElement,
    config: Partial<MenuConfig>,
    public pMenu?: CMenu,
  ){
    this.setConfig(config);
    this.creator = new Creator(this, this.config);
    this.creator.createMenu();
  }

  public setConfig(config: Partial<MenuConfig>){
    this.config = {...defaultConfig, ...config};
  }

  //Show
  public show(coordinates?: Coordinates) {
    this.setDisabled();
    if (coordinates) this.setCoordinate(coordinates);
    classed(this.container, 'opened-nav', true);
    return this;
  }
  private setDisabled(){
    this.creator.anchors.forEach((a) =>  a.setDisabled!());
  }
  private setCoordinate(coordinate: Coordinates){
    style(this.container, 'left', coordinate.x + "px");
    style(this.container, 'top', coordinate.y + "px");
  }

  //Hide
  public hide() {
    classed(this.container, 'opened-nav', false);
    return this;
  }

  //Styles
  public styles(styles: Style) {
    Object.entries(styles).forEach(([k,v]) => style(this.container, k, v));
    return this;
  }
}
