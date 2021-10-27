import { TestBed } from '@angular/core/testing';

import { SventasService } from './sventas.service';

describe('SventasService', () => {
  let service: SventasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SventasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
