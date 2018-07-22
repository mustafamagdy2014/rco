import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherRecommendationComponent } from './researcher-recommendation.component';

describe('ResearcherRecommendationComponent', () => {
  let component: ResearcherRecommendationComponent;
  let fixture: ComponentFixture<ResearcherRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
