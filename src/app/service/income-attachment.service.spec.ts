import { TestBed, inject } from '@angular/core/testing';

import { IncomeAttachmentService } from './income-attachment.service';

describe('IncomeAttachmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncomeAttachmentService]
    });
  });

  it('should be created', inject([IncomeAttachmentService], (service: IncomeAttachmentService) => {
    expect(service).toBeTruthy();
  }));
});
