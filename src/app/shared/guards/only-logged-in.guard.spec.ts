import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlyLoggedInGuard } from './only-logged-in.guard';

describe('onlyLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlyLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
