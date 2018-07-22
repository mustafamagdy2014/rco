/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WidowComponent } from './widow.component';

describe('WidowComponent', () => {
  let component: WidowComponent;
  let fixture: ComponentFixture<WidowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
