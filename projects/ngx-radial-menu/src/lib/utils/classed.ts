import {ClassList} from "../classes/class-list.class";

export default function classed(el: HTMLElement, name: string, value: any) {
  const names = name.trim().split(/^|\s+/);
  const list = new ClassList(el);

  if (arguments.length < 2) {
    let i = -1;
    const n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  const callee =
    typeof value === "function"?
      list.classedFunction : value?
        list.classedTrue : list.classedFalse

  return callee(names, value);
}
