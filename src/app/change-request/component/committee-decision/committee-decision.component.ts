import { Topic } from './../../../domain/Topic';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Globals } from '../../../common/globals';
import { SponsershipChangeRequest } from '../../../domain/SponsershipChangeRequest';

@Component({
  selector: 'committee-decision',
  templateUrl: './committee-decision.component.html',
  styleUrls: ['./committee-decision.component.css']
})
export class CommitteeDecisionComponent implements OnInit {

  header:string;
  @Input("sponsershipChangeRequest") sponsershipChangeRequest:SponsershipChangeRequest;
  @Input("topic") topic:Topic;

  minDateValue: Date = new Date();
  
  constructor() {
    this.header=Globals.COMMITTEE_DECISION_HEADER; 
   }

  ngOnInit() {
  }

}
