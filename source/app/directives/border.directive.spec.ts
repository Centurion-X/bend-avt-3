import { ElementRef } from '@angular/core';

import { BorderDirective } from './border.directive';

describe('BorderDirective', () =>
{
  it('should create an instance', () =>
  {
    let tag: ElementRef | any = null;
    const directive = new BorderDirective(tag);
    expect(directive).toBeTruthy();
  });
});