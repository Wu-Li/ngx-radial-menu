# NgxRadialMenu

This library is an Angular adaptation of yandongCoder's circular-menu library:
https://www.npmjs.com/package/circular-menu

## Installation

npm install ngx-radial-menu

## Peer Dependencies

@angular/material - used for mat-icons

## Component Usage

`<ngx-radial-menu [config]="menuConfig"></ngx-radial-menu>`

## Config

### Options

Apply a `Partial<MenuConfig>` object with any of these properties to the [config] input.

- **totalAngle**: The total arc of the menu (i.e. 180 is a half circle)
  - value: `0-360` (unit is unnecessary)
  - default: ```360```deg (complete circle)
- **spaceDeg**: The space between menu items
  - value: ```number``` (0-5 is suitable)
  - default: ```0``` (The default is good)
- **background**:
  - value: Acceptable CSS color value
  - default: ```#323232```
- **backgroundHover**:
  - value: Acceptable CSS color value
  - default: ```#515151```
- **pageBackground** (For antialiasing):
  - value: Acceptable CSS color value ( You should pass the color of your page. )
  - default: ```transparent```
- **diameter**(circular menu radius):
  - value:  `number` (unit is unnecessary)
  - default: ```300```px
- **position**:
  - value: `"top" | "left" | "right" | "bottom"`
  - default: `"top"`
- **start**:
  - value: ```0-360``` (unit is unnecessary)
  - default: ```0``` deg
- **horizontal** :
  - value: ```boolean```
  - default: ```true```
- **hideAfterClick** (Whether hide menu after click):
  - value: ```boolean```
  - default: ```true```
- **menus**: `MenuItem[]` (see Menu Items)

### Menu Items

  - title: `string` (Title is not too long, otherwise it will overflow container)
  - icon: uses mat-icon, compatible with font icons or svg icons
    - fontIcon: `string` for using mat-icon font icons
    - fontSet: `string` font set for font icons only
    - svgIcon: `string` name of svgIcon, may include namespace
    - color: Any acceptable CSS color
  - href: `string` (url, like "http://google.com" or "#hash")
  - target: `'_self' | '_blank' | '_parent' | '_top'` for href links
  - click: `Function` (click callback function)
  - disabled: `boolean | () => boolean` (boolean value, or a boolean valued function)
    
### Methods

- **show (coordinates: {x: number, y: number})**：show menus
  - coordinates: The location to open the menu, usually derived from event.clientX and event.clientY of a MouseEvent

- **hide()**: hide menus
