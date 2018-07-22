import { TestBed, inject } from '@angular/core/testing';

import { SponsorshipChangeRequestService } from './sponsorship-change-request.service';

describe('SponsorshipChangeRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SponsorshipChangeRequestService]
    });
  });

  it('should be created', inject([SponsorshipChangeRequestService], (service: SponsorshipChangeRequestService) => {
    expect(service).toBeTruthy();
  }));
});
