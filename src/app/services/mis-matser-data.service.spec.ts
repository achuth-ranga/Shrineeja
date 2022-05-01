import { TestBed } from '@angular/core/testing';

import { MisMatserDataService } from './mis-matser-data.service';

describe('MisMatserDataService', () => {
  let service: MisMatserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisMatserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
