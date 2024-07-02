import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {v4 as uuid} from 'uuid';

@Directive({
  selector: '[after]',
  standalone: true
})
export class AfterDirective implements AfterViewInit {
  @Input('after.width') public width?: string;
  @Input('after.height') public height?: string;
  @Input('after.margin-left') public marginLeft?: string;
  @Input('after.margin-right') public marginRight?: string;
  @Input('after.margin-top') public marginTop?: string;
  @Input('after.margin-bottom') public marginBottom?: string;
  @Input('after.border') public border?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit() {
    const id = uuid();
    this.renderer.addClass(this.el.nativeElement, 'after-' + id);
    const style = this.renderer.createElement('style');
    let styles = '.after-' + id + ':after { content:"";';
    styles += this.width? 'width:' + this.width + 'px;' : '';
    styles += this.height? 'height:' + this.height + 'px;' : '';
    styles += this.marginLeft? 'margin-left:' + this.marginLeft + 'px;' : '';
    styles += this.marginRight ? 'margin-right:' + this.marginRight + 'px;' : '';
    styles += this.marginTop ? 'margin-top:' + this.marginTop + 'px;' : '';
    styles += this.marginBottom ? 'margin-bottom:' + this.marginBottom + 'px;' : '';
    styles += this.border ? 'border:' + this.border + 'px;' : '';
    styles += '}';
    this.renderer.appendChild(style, this.renderer.createText(styles));
    this.renderer.insertBefore(this.el.nativeElement.parent, style, this.el.nativeElement);
  }
}
