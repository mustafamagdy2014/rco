import { TestBed, inject } from '@angular/core/testing';

import { SponserService } from './sponser.service';

describe('SponserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SponserService]
    });
  });

  it('should be created', inject([SponserService], (service: SponserService) => {
    expect(service).toBeTruthy();
  }));
});
