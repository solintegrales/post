import { TestBed } from '@angular/core/testing';

import { ScomprasService } from './scompras.service';

describe('ScomprasService', () => {
  let service: ScomprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScomprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
