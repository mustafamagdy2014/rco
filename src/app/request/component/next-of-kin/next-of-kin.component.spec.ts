/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NextOfKinComponent } from './next-of-kin.component';

describe('NextOfKinComponent', () => {
  let component: NextOfKinComponent;
  let fixture: ComponentFixture<NextOfKinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextOfKinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextOfKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
