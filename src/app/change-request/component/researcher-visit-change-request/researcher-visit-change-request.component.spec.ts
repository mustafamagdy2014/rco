import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherVisitChangeRequestComponent } from './researcher-visit-change-request.component';

describe('ResearcherVisitChangeRequestComponent', () => {
  let component: ResearcherVisitChangeRequestComponent;
  let fixture: ComponentFixture<ResearcherVisitChangeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherVisitChangeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherVisitChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
