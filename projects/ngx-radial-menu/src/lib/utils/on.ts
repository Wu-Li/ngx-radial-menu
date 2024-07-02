export default function on(
  el: HTMLElement,
  type: string,
  callback: Function,
  data?: any
) {
  el.addEventListener(type, (e) => callback.call(el, e, data));
}
