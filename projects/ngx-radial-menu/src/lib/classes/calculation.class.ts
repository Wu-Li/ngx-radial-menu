import {MenuConfig, Style} from "../models";

export default class Calculation {
  private antialiasing = 3;
  private fixedTop  = 10;
  private middleRatio = 0.41;

  /** Icon **/
  public iconSizeRatio = 0.65;
  public marginTopRatio = 0.2;
  public fontHeight = 13;

  /** Text **/
  public withIconMarginTop = "3px";
  public withIconTop = "-3px";

  itemsNum: number;
  spaceNumber: number;
  radius: number;
  coverRadius: number;
  clickZoneRadius: number;
  listSize: Style;
  clickZoneSize: Style;
  menuSize: Style;
  coverSize: Style;
  startDeg: number;
  centralDeg: number;
  rotateUnit: number;
  skewDeg: number;
  unskewDeg: number;
  textTop: string;
  iconSize: string;
  iconMargin: string;

  constructor(
    private config: MenuConfig,
  ) {
    this.itemsNum = this.config.menus.length;
    this.spaceNumber = this.config.totalAngle === 360 ? this.itemsNum : this.itemsNum - 1;
    this.radius = config.diameter / 2;
    this.coverRadius = this.getCoverRadius(this.radius, this.config.percent);
    this.clickZoneRadius = this.radius - this.coverRadius;
    this.listSize = this.getListSize();
    this.clickZoneSize = this.getClickZoneSize();
    this.menuSize = this.getMenuSize();
    this.coverSize = this.getCoverSize();
    this.startDeg = this.getStartDeg();
    this.centralDeg = (this.config.totalAngle - (this.config.spaceDeg * this.spaceNumber)) / this.itemsNum;
    this.rotateUnit = this.centralDeg + this.config.spaceDeg;
    this.skewDeg = 90 - this.centralDeg;
    this.unskewDeg = - (90 - this.centralDeg / 2);
    this.textTop = this.getTextTop();
    this.iconSize = (this.clickZoneRadius * this.iconSizeRatio - this.fontHeight) + 'px';
    this.iconMargin = (this.clickZoneRadius * this.marginTopRatio - this.fontHeight) + 'px';
  }

  private getCoverRadius(radius: number, percent: number): number {
    const square = radius * radius * 2;
    return Math.sqrt(square) * percent + this.antialiasing;
  }

  private getCoverSize() {
    var l: string = (this.coverRadius * 2) + 'px';
    var m: string = (-l / 2) + 'px';
    return {
      width:  l,
      height: l,
      marginLeft: m,
      marginTop: m
    };
  }

  public horizontalDeg = (i: number) => -(this.rotateDeg(i) + this.unskewDeg);
  public rotateDeg = (i: number) => this.startDeg + this.rotateUnit * i;
  private getStartDeg(): number {
    const top = -(this.config.totalAngle - 180) / 2;
    const positions = {
      top: top,
      left: top - 90,
      right: top + 90,
      bottom: top + 180
    };
    return this.config.start ?? positions[this.config.position];
  }

  private getClickZoneSize(): Style {
    const l:string = (this.config.diameter) + 'px';
    const m:string = (- this.config.diameter / 2) + 'px';
    return {
      width:  l,
      height: l,
      marginRight: m,
      marginBottom: m
    };
  }

  private getListSize(): Style {
    const l: string = (this.config.diameter / 2) + 'px';
    return {
      width:  l,
      height: l
    };
  }

  private getMenuSize(): Style {
    const l: string = this.config.diameter + 'px';
    const m: string = (-this.config.diameter / 2) + 'px';
    return {
      width:  l,
      height: l,
      marginLeft: m,
      marginTop: m
    };
  }

  getTextTop = () => (this.clickZoneRadius * this.middleRatio - this.fixedTop + 'px')
}
