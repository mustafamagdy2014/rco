import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeDecisionComponent } from './committee-decision.component';

describe('CommitteeDecisionComponent', () => {
  let component: CommitteeDecisionComponent;
  let fixture: ComponentFixture<CommitteeDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
