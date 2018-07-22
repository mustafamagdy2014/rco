import { TestBed, inject } from '@angular/core/testing';

import { ChangeRequestService } from './change-request.service';

describe('ChangeRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeRequestService]
    });
  });

  it('should be created', inject([ChangeRequestService], (service: ChangeRequestService) => {
    expect(service).toBeTruthy();
  }));
});
