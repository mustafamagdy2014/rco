import { TestBed, inject } from '@angular/core/testing';

import { ExpenseValidationService } from './expense-validation.service';

describe('ExpenseValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseValidationService]
    });
  });

  it('should be created', inject([ExpenseValidationService], (service: ExpenseValidationService) => {
    expect(service).toBeTruthy();
  }));
});
