import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestApplicantComponent } from './change-request-applicant.component';

describe('ChangeRequestApplicantComponent', () => {
  let component: ChangeRequestApplicantComponent;
  let fixture: ComponentFixture<ChangeRequestApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRequestApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRequestApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
