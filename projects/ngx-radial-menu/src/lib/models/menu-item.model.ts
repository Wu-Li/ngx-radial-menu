export interface MenuItem {
  title: string,
  icon: string | [string, string?],
  href?: string | {url: string, blank: boolean}
  click?: Function;
  disabled?: boolean;
  menus?: MenuItem[]
}
