import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingActionComponent } from './meeting-action.component';

describe('MeetingActionComponent', () => {
  let component: MeetingActionComponent;
  let fixture: ComponentFixture<MeetingActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
