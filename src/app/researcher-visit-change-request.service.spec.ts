import { TestBed, inject } from '@angular/core/testing';

import { ResearcherVisitChangeRequestService } from './researcher-visit-change-request.service';

describe('ResearcherVisitChangeRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResearcherVisitChangeRequestService]
    });
  });

  it('should be created', inject([ResearcherVisitChangeRequestService], (service: ResearcherVisitChangeRequestService) => {
    expect(service).toBeTruthy();
  }));
});
