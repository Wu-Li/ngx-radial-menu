# NgxRadialMenu

This library is an Angular adaptation of yandongCoder's circular-menu library:
https://www.npmjs.com/package/circular-menu

## Installation

npm install ngx-radial-menu

## Peer Dependencies

@angular/material - used for mat-icons only

## Component Usage

`<ngx-radial-menu [config]="menuConfig"></ngx-radial-menu>`

## Config

### Options

Apply a Partial<MenuConfig> object with any of these properties to the [config] input.

- **totalAngle**: The total arc of the menu (i.e. 180 is a half circle)
  - value: ```0-360``` (unit is unnecessary)
  - default: ```360```deg (complete circle)
- **spaceDeg**: The space between menu items
  - value: ```Int``` (0-5 is suitable)
  - default: ```0``` (The default is good)
- **background**:
  - value: Acceptable CSS color value
  - default: ```#323232```
- **backgroundHover**:
  - value: Acceptable CSS color value
  - default: ```#515151```
- **pageBackground** (For antialiasing, [example explanation](https://raw.githubusercontent.com/yandongCoder/circular-menu/master/examples/images/CMenu-antialiasing.png)):
  - value: Acceptable CSS color value ( You should pass the color of your page. )
  - default: ```transparent```
- **diameter**(circular menu radius):
  - value:  number (unit is unnecessary)
  - default: ```300```px
- **position**([demo](https://jsfiddle.net/yandongCoder/c00qb1kh/7/)):
  - value: "top" | "left" | "right" | "bottom"
  - default: "top"
- **start**([demo](https://jsfiddle.net/yandongCoder/c00qb1kh/8/)):
  - value: ```0-360``` (unit is unnecessary)
  - default: ```0``` deg
- **horizontal** (Whether horizontal icon and text [demo](https://jsfiddle.net/yandongCoder/c00qb1kh/9/)):
  - value: ```true | false```
  - default: ```true```
- **hideAfterClick** (Whether hide menu after click):
  - value: ```true | false```
  - default: ```true```

- **menus**: (Array of objects, specifying menu items, **angle of each item mush < 90deg, it meaning "totalAngle / items number" must <= 90deg [wrong use demo](https://jsfiddle.net/yandongCoder/c00qb1kh/10/)** )
  - title: string (Title is not too long, otherwise it will overflow container)
  - icon: string (css class, e.g. "fa fa-facebook" "custom-icon icon1")
  - href: string (like "http://google.com" or "#hash")
  - target: '_self' | '_blank' | '_parent' | '_top';
  - click: Function (click callback function)
  - disabled:
    - String: ```true | false```
    - Function: (Function must return boolean value)

### Methods

- **show (coordinates: {x: number, y: number})**：show menus
  - coordinates: The location to open the menu, usually derived from event.clientX and event.clientY of a MouseEvent
  
- **hide()**: hide menus
