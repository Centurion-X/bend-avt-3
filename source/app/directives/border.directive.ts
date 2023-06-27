// import from Angular framework
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive
({
  exportAs: 'border',
  host: {'(document: keyup)': 'initKeyUp($event)'},
  selector: '[appBorder]'
})

export class BorderDirective implements AfterViewInit, OnInit
{
  @Input() initFirst: boolean = false;
  @Input() selector: string;
  @Output() isRendered = new EventEmitter();
  private elements: Array<HTMLElement>;
  private index: number = 0;
  public activeElementIndex: number;
  constructor(private tag: ElementRef){}
  ngAfterViewInit(): void
  {
    if (this.selector)
    {
      this.elements = this.tag.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst)
      {
        if (this.elements[0])
           (this.elements[0] as HTMLElement).classList.add('border');
      }
    }
    this.activeElementIndex = 0;
    setTimeout(() => {this.isRendered.emit(true)});
  }
  ngOnInit(): void {}
  initKeyUp(event: KeyboardEvent): void
  {
    if (event.key != 'ArrowLeft' && event.key != 'ArrowRight' || this.elements.length == 0) return
    else if (event.key == 'ArrowLeft' && this.index > 0)
    {
      this.index--;
      this.resetBorder();
    }
    else if (event.key == 'ArrowRight' && this.index < this.elements.length - 1)
    {
      this.index++;
      this.resetBorder();
    }
  }
  resetBorder(): void
  {
    if (this.elements[this.activeElementIndex])
       (this.elements[this.activeElementIndex] as HTMLElement).classList.remove('border');
    if (this.elements[this.index])
       (this.elements[this.index] as HTMLElement).classList.add('border');
    if (this.elements.length != 0)
        this.activeElementIndex = this.index;
  }
  updateItems(): void
  {
    this.elements = this.tag.nativeElement.querySelectorAll(this.selector);
    if (this.elements.length == 0)
        this.activeElementIndex = -1
    this.index = 0;
  }
}