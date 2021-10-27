import { TestBed } from '@angular/core/testing';

import { ProvService } from './prov.service';

describe('ProvService', () => {
  let service: ProvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
