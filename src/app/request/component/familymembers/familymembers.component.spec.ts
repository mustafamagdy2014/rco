import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilymembersComponent } from './familymembers.component';

describe('FamilymembersComponent', () => {
  let component: FamilymembersComponent;
  let fixture: ComponentFixture<FamilymembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilymembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilymembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
