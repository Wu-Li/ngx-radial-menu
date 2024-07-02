import defaultView from "./window";

function styleRemove(el: HTMLElement, name: string) {
  el.style.removeProperty(name);
}

function styleConstant(
  el: HTMLElement,
  name: string,
  value: string | null | any,
  priority: '!important' | ''
) {
  el.style.setProperty(name, value, priority);
}

function styleFunction(
  el: HTMLElement,
  name: string,
  func: Function | any,
  priority: '!important' | ''
) {
  var v = func.apply(el, arguments);
  if (v == null) el.style.removeProperty(name);
  else el.style.setProperty(name, v, priority);
}

export default function style(
  el: HTMLElement,
  name: string,
  value: string | number,
  priority?: '!important'
) {
  let node;
  return arguments.length > 1
    ? ((value == null
      ? styleRemove : typeof value === "function"
        ? styleFunction
        : styleConstant)(el, name, value, priority == null ? "" : priority))
    : defaultView(node = el)
      .getComputedStyle(node, null)
      .getPropertyValue(name);
}
