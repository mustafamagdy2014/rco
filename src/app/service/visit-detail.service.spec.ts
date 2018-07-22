import { TestBed, inject } from '@angular/core/testing';

import { VisitDetailService } from './visit-detail.service';

describe('VisitDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitDetailService]
    });
  });

  it('should be created', inject([VisitDetailService], (service: VisitDetailService) => {
    expect(service).toBeTruthy();
  }));
});
