import { TestBed, inject } from '@angular/core/testing';

import { IncomeValidationService } from './income-validation.service';

describe('IncomeValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncomeValidationService]
    });
  });

  it('should be created', inject([IncomeValidationService], (service: IncomeValidationService) => {
    expect(service).toBeTruthy();
  }));
});
