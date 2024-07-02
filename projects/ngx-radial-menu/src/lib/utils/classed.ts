
export function classed(el: HTMLElement, name: string, value: any) {
  const names = name.trim().split(/^|\s+/);
  const list = newClassList(el);

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

  return callee.call(list, names, value);
}

function newClassList(el: HTMLElement) {
  return {
    el,
    names: (el.getAttribute("class") || "")
      .trim().split(/^|\s+/),

    add(name: string) {
      let i = this.names.indexOf(name);
      if (i < 0) {
        this.names.push(name);
        this.el.setAttribute("class", this.names.join(" "));
      }
    },
    remove(name: string) {
      var i = this.names.indexOf(name);
      if (i >= 0) {
        this.names.splice(i, 1);
        this.el.setAttribute("class", this.names.join(" "));
      }
    },
    contains(name: string) {
      return this.names.indexOf(name) >= 0;
    },
    classedAdd(names: string[]) {
      let i = -1
      const n = names.length;
      while (++i < n) this.add(names[i]);
    },
    classedRemove(names: string[]) {
      let i = -1;
      const n = names.length;
      while (++i < n) this.remove(names[i]);
    },
    classedTrue(names: string[]) {
      this.classedAdd(names);
    },
    classedFalse(names: string[]) {
      this.classedRemove(names);
    },
    classedFunction(names: string[], func: Function) {
      (func.apply(arguments) ? this.classedAdd : this.classedRemove)(names);
    }
  }
}
