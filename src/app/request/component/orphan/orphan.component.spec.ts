/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrphanComponent } from './orphan.component';

describe('OrphanComponent', () => {
  let component: OrphanComponent;
  let fixture: ComponentFixture<OrphanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
