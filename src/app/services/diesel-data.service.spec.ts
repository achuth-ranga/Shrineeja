import { TestBed } from '@angular/core/testing';

import { DieselDataService } from './diesel-data.service';

describe('DieselDataService', () => {
  let service: DieselDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DieselDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
