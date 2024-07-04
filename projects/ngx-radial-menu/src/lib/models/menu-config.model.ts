import {MenuItem} from "./menu-item.model";

export interface MenuConfig {
  totalAngle: number;
  spaceDeg: number;
  background: string;
  backgroundHover?: string;
  pageBackground?: string;
  percent: number
  diameter: number;
  position: 'top' | 'bottom' | 'left' | 'right';
  start?: number;
  horizontal: boolean;
  animation: string;
  hideAfterClick: boolean;
  allMenus: MenuItem[];
  menus: MenuItem[];
}

export const defaultConfig: MenuConfig = {
  totalAngle: 360,//deg,
  spaceDeg: 0,//deg
  background: "#323232",
  backgroundHover: "#515151",
  pageBackground: "transparent",
  percent: 0.32,//%
  diameter: 300,//px
  position: 'top',
  horizontal: true,
  animation: "into",
  hideAfterClick: true,
  allMenus: [],
  menus: []
};
