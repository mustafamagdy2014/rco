import { TestBed, inject } from '@angular/core/testing';

import { ResearcherVisitAttachmentService } from './researcher-visit-attachment.service';

describe('ResearcherVisitAttachmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResearcherVisitAttachmentService]
    });
  });

  it('should be created', inject([ResearcherVisitAttachmentService], (service: ResearcherVisitAttachmentService) => {
    expect(service).toBeTruthy();
  }));
});
