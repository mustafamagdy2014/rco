import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDifferencesReportComponent } from './monthly-differences-report.component';

describe('MonthlyDifferencesReportComponent', () => {
  let component: MonthlyDifferencesReportComponent;
  let fixture: ComponentFixture<MonthlyDifferencesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDifferencesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDifferencesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
