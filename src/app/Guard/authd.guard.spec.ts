import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { authdGuard } from './authd.guard';

describe('authdGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
