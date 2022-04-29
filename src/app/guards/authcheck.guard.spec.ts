import { TestBed } from '@angular/core/testing';

import { AuthcheckGuard } from './authcheck.guard';

describe('AuthcheckGuard', () => {
  let guard: AuthcheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthcheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
