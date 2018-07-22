import { TestBed, inject } from '@angular/core/testing';

import { AssigneeService } from './assignee.service';

describe('AssigneeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssigneeService]
    });
  });

  it('should be created', inject([AssigneeService], (service: AssigneeService) => {
    expect(service).toBeTruthy();
  }));
});
