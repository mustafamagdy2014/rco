import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherVisitComponent } from './researcher-visit.component';

describe('ResearcherVisitComponent', () => {
  let component: ResearcherVisitComponent;
  let fixture: ComponentFixture<ResearcherVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
