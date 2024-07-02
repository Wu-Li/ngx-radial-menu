export class ClassList {
  static create = (el: HTMLElement) =>
    (el.classList && el.classList instanceof ClassList)?
      el.classList : new ClassList(el);

  constructor(
    private el: HTMLElement
  ) {
    this.names = (el.getAttribute("class") || "")
      .trim().split(/^|\s+/);
  }

  private names: string[] = [];

  add(name: string) {
    let i = this.names.indexOf(name);
    if (i < 0) {
      this.names.push(name);
      this.el.setAttribute("class", this.names.join(" "));
    }
  }

  remove(name: string) {
    var i = this.names.indexOf(name);
    if (i >= 0) {
      this.names.splice(i, 1);
      this.el.setAttribute("class", this.names.join(" "));
    }
  }

  contains(name: string) {
    return this.names.indexOf(name) >= 0;
  }

  private classedAdd(names: string[]) {
    let i = -1
    const n = names.length;
    while (++i < n) this.add(names[i]);
  }

  private classedRemove(names: string[]) {
    let i = -1;
    const n = names.length;
    while (++i < n) this.remove(names[i]);
  }

  public classedTrue(names: string[]) {
    this.classedAdd(names);
  }

  public classedFalse(names: string[]) {
    this.classedRemove(names);
  }

  public classedFunction(names: string[], func: Function) {
    (func.apply(arguments) ? this.classedAdd : this.classedRemove)(names);
  }
}
