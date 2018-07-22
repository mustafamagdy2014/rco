import { TestBed, inject } from '@angular/core/testing';

import { ResearcherVisitService } from './researcher-visit.service';

describe('ResearcherVisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResearcherVisitService]
    });
  });

  it('should be created', inject([ResearcherVisitService], (service: ResearcherVisitService) => {
    expect(service).toBeTruthy();
  }));
});
