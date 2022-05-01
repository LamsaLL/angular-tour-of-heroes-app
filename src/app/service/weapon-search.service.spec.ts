import { TestBed } from '@angular/core/testing';

import { WeaponSearchService } from './weapon-search.service';

describe('WeaponSearchService', () => {
  let service: WeaponSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
