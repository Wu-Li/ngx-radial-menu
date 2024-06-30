import {MenuItem} from "@models";

export interface MenuConfig {
  totalAngle?: number;
  spaceDeg?: number;
  background?: string;
  backgroundHover?: string;
  pageBackground?: string;
  diameter?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  start?: number;
  horizontal?: boolean;
  hideAfterClick?: boolean;
  menus: MenuItem[]
}
