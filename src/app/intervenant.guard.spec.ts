import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { intervenantGuard } from './intervenant.guard';

describe('intervenantGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => intervenantGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
