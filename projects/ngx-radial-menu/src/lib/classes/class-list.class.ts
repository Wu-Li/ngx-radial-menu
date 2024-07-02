export class ClassList extends DOMTokenList {
  private names: string[] = [];

  constructor(
    private el: HTMLElement
  ) {
    super();
    if (el.classList && el.classList instanceof ClassList)
      return el.classList;
    this.names = (el.getAttribute("class") || "")
      .trim().split(/^|\s+/);
  }

  override add(name: string) {
    let i = this.names.indexOf(name);
    if (i < 0) {
      this.names.push(name);
      this.el.setAttribute("class", this.names.join(" "));
    }
  }

  override remove(name: string) {
    var i = this.names.indexOf(name);
    if (i >= 0) {
      this.names.splice(i, 1);
      this.el.setAttribute("class", this.names.join(" "));
    }
  }

  override contains(name: string) {
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
