import { TestBed } from '@angular/core/testing';

import { InterceptionService } from './interception.service';

describe('InterceptionService', () =>
{
  let service: InterceptionService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptionService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});