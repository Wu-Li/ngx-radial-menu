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
    let styles = '.after-' + id + ':after { ';
    styles += this.width? 'width:' + this.width + ';' : '';
    styles += this.height? 'height:' + this.height + ';' : '';
    styles += this.marginLeft? 'margin-left:' + this.marginLeft + ';' : '';
    styles += this.marginRight ? 'margin-right:' + this.marginRight + ';' : '';
    styles += this.marginTop ? 'margin-top:' + this.marginTop + ';' : '';
    styles += this.marginBottom ? 'margin-bottom:' + this.marginBottom + ';' : '';
    styles += this.border ? 'border:' + this.border + ';' : '';
    styles += '}';
    let text = this.renderer.createText(styles);
    const style = this.renderer.createElement('style');
    this.renderer.appendChild(style, text);
    let parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.insertBefore(parent, style, this.el.nativeElement);
  }
}
