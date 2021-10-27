import { TestBed } from '@angular/core/testing';

import { ScajaService } from './scaja.service';

describe('ScajaService', () => {
  let service: ScajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
