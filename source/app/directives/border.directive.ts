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
    if (event.key != 'ArrowLeft' && event.key != 'ArrowRight') return
    else if (event.key == 'ArrowLeft' && this.index > 0)
    {
      this.index--;
      this.resetBorder(this.index + 1, this.index)
    }
    else if (event.key == 'ArrowRight' && this.index < this.elements.length - 1)
    {
      this.index++;
      this.resetBorder(this.index - 1, this.index)
    }
    this.activeElementIndex = this.index;
  }
  resetBorder(oldIndex: number, newIndex: number): void
  {
    (this.elements[oldIndex] as HTMLElement).classList.remove('border');
    (this.elements[newIndex] as HTMLElement).classList.add('border');
  }
}