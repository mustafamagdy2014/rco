/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FatherComponent } from './father.component';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
