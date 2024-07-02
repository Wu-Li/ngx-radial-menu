export interface MenuItem {
  title: string,
  icon?: {
    color?: string,
    fontIcon?: string,
    fontSet?: string,
    inline?: boolean,
    svgIcon?: string
  },
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  click?: Function;
  disabled?: boolean;
  menus?: MenuItem[]
}
