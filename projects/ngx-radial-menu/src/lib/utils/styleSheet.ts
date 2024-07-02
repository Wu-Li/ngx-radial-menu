export function styleSheet(
  el: HTMLElement,
  prop: string,
  value: string | number,
  pseudo?: string
) {
  const sheetId: string = "sheetStyles";
  const head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
  const sheet: HTMLElement = document.getElementById(sheetId) || document.createElement('style');
  sheet.id = sheetId;
  var className: string = "s-S" + UID.getNew();

  el.className += " " + className;

  sheet.innerHTML += " ." + className + ( pseudo ? (":" + pseudo) : "" ) + "{" + prop + ":" + value + "}";
  head.appendChild(sheet);
  return el;
};

const UID = {
  current: 1,
  getNew: () => UID.current++
};
