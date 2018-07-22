import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CachingReportComponent } from './caching-report.component';

describe('CachingReportComponent', () => {
  let component: CachingReportComponent;
  let fixture: ComponentFixture<CachingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CachingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CachingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
