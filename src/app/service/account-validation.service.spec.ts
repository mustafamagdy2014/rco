import { TestBed, inject } from '@angular/core/testing';

import { AccountValidationService } from './account-validation.service';

describe('AccountValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountValidationService]
    });
  });

  it('should be created', inject([AccountValidationService], (service: AccountValidationService) => {
    expect(service).toBeTruthy();
  }));
});
