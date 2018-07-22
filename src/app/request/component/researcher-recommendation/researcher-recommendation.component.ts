import { SelectItem } from 'primeng/primeng';
import { OnChanges } from '@angular/core';
import { FamilyMember } from './../../../domain/FamilyMember';
import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../../common/globals';
import { SocialResearcherRecommendation } from '../../../domain/SocialResearcherRecommendation';

@Component({
  selector: 'researcher-recommendation',
  templateUrl: './researcher-recommendation.component.html',
  styleUrls: ['./researcher-recommendation.component.css']
})
export class ResearcherRecommendationComponent implements OnInit, OnChanges {

  @Input()
  familyMembers: FamilyMember[];
  header: string;
  cols: any[];
  researcherRecommendations: SelectItem[] = [];

  constructor(private globals: Globals) { }

  ngOnChanges(changes: any): void {
    let _familyMembers: FamilyMember[] = changes.familyMembers.currentValue;
    if (_familyMembers) {
      this.familyMembers.forEach(familyMember => {
        if (familyMember.recommendation == null) {
          familyMember.recommendation = new SocialResearcherRecommendation();
        }
      });
    }
  }

  ngOnInit() {
    this.header = this.globals.SOCIAL_RESEARCHER_RECOMMENDATION_HEADER;
    this.cols =
      [
        { header: 'الرقم الشخصي' },
        { header: 'الاسم' },
        { header: 'نوع الفرد' },
        { header: 'التوصية' },
        { header: 'السبب' },
      ];
    this.researcherRecommendations = [{ label: 'يوصى به', value: true }, { label: 'لا يوصى به', value: false }];
  }

}
