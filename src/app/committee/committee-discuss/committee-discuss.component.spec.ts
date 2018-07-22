import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeDiscussComponent } from './committee-discuss.component';

describe('CommitteeDiscussComponent', () => {
  let component: CommitteeDiscussComponent;
  let fixture: ComponentFixture<CommitteeDiscussComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeDiscussComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeDiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
