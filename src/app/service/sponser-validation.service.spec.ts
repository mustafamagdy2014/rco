import { TestBed, inject } from '@angular/core/testing';

import { SponserValidationService } from './sponser-validation.service';

describe('SponserValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SponserValidationService]
    });
  });

  it('should be created', inject([SponserValidationService], (service: SponserValidationService) => {
    expect(service).toBeTruthy();
  }));
});
