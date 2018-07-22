import { TestBed, inject } from '@angular/core/testing';

import { ResearcherVisitChangeRequestAttachmentService } from './researcher-visit-change-request-attachment.service';

describe('ResearcherVisitChangeRequestAttachmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResearcherVisitChangeRequestAttachmentService]
    });
  });

  it('should be created', inject([ResearcherVisitChangeRequestAttachmentService], (service: ResearcherVisitChangeRequestAttachmentService) => {
    expect(service).toBeTruthy();
  }));
});
