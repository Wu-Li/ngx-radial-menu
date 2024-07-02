export interface MenuItem {
  title: string,
  icon?: string | [string, string?],
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  click?: Function;
  disabled?: boolean;
  menus?: MenuItem[]
}
