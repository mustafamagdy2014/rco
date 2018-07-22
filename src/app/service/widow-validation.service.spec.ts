import { TestBed, inject } from '@angular/core/testing';

import { WidowValidationService } from './widow-validation.service';

describe('WidowValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidowValidationService]
    });
  });

  it('should be created', inject([WidowValidationService], (service: WidowValidationService) => {
    expect(service).toBeTruthy();
  }));
});
