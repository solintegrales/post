import { TestBed } from '@angular/core/testing';

import { SprincipalService } from './sprincipal.service';

describe('SprincipalService', () => {
  let service: SprincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
