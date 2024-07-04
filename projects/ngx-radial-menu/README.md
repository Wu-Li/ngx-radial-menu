# NgxRadialMenu

This library is an Angular adaptation of yandongCoder's circular-menu library:
https://www.npmjs.com/package/circular-menu

## Features

 - Customizable: The menu component accepts a number of configuration options, allowing for different visual presentation.
 - Submenus: Menu items may have submenus that fly out around that menu item. 
 - Material Icons: Works seamlessly with material icons, either font icons, or svg icons. (compatibility with other icon sets is an option I hope to add)
 - Contexual Data: It also allows data to be passed in when the menu is called, which will be automatically passed to any of the menu items' callback (click) functions.
 - Dynamic Menu Items: It also allows menu items to be filtered out based on an array passed at the time show() is called. You can use the filter to create a menu that is responsive to the context, only containing certain menu items if the click target meets certain criteria.

## Installation

npm install ngx-radial-menu

## Peer Dependencies

@angular/material - used for mat-icons

## Component Usage

`<ngx-radial-menu [config]="menuConfig"></ngx-radial-menu>`

## Config

`[config]` Apply a `Partial<MenuConfig>` object with any of the properties under options below.

### Options

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
- click: `(event: MouseEvent, data: any) => void` (click callback function)
  - Data passed by show(...) will be provided to callback functions as the second argument
- disabled: `boolean | () => boolean` (boolean value, or a boolean valued function)

### Methods

- **hide()**: hide menus

- **show (coordinates: {x: number, y: number}, data?: any, filter?: string[])**：show menus
  - coordinates: The location to open the menu, usually derived from event.clientX and event.clientY of a MouseEvent
  - data: any data you want to make available to the click functions. This data is set once when the menu is generated, and used by all click callbacks, so if different functions need different data items, be sure to structure your data input here to accommodate that.
  - filter: an array of the titles of MenuItems that should not display at all for this call. 

Here is an example of how you might use show with all of its arguments:

`public showRadialMenu(event:MouseEvent, vertex: Vertex) {`

`let filter = [];`

`if (vertex.pinned) filter.push('pin')`

`else filter.push('unpin')`

`this.ngxRadialMenu.show({x:event.clientX,y:event.clientY}, vertex, filter)`

This will cause ensure that the 'unpin' menu item is only available when the vertex is pinned, and the pin option is available when it is not already pinned.
Passing the vertex in as the data object allows all of the menu callback functions to act on that specific vertex, or to make use properties of that vertex. 
