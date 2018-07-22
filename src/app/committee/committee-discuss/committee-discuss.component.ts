import { Globals } from './../../common/globals';
import { FamilyMember } from './../../domain/FamilyMember';
import { OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, Input } from '@angular/core';
import { Family } from '../../domain/Family';
import { Lookup } from '../../domain/lookup';
import { Decision } from '../../domain/Decision';
import { SponsershipRequest } from '../../domain/SponsershipRequest';
import { CommitteeDecision } from '../../domain/CommitteeDecision';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'committee-discuss',
  templateUrl: './committee-discuss.component.html',
  styleUrls: ['./committee-discuss.component.css']
})
export class CommitteeDiscussComponent implements OnInit,OnChanges {

  @Input() sponsershipRequest: SponsershipRequest;
  @Input() rcoLookup: Lookup;
  decisions: Decision[] = [];
  startDate: Date;
  minDateValue: Date = new Date();
  numberOfMonthes: SelectItem[]=[];
  amount: SelectItem[]=[];
  header:string=Globals.COMMITTEE_DECISION_HEADER;
  comment:string;
  
  constructor() {
    this.initNumberOfMonths();
    this.initAmount();
  }
 ngOnChanges(changes:any):void {
    let _sponsershipRequest:SponsershipRequest = changes.sponsershipRequest.currentValue;
    if (_sponsershipRequest&&_sponsershipRequest.id ) { 
      this.sponsershipRequest.family.familyMembers.forEach(fm => {
        if(fm.committeeDecision==null||fm.committeeDecision.id==null){
        fm.committeeDecision =new CommitteeDecision();
        fm.committeeDecision.decision=this.rcoLookup['DECISION'][1];
        fm.committeeDecision.numberOfMonthes=0;
        }
      });
    }
  } 
  ngOnInit() {
    this.decisions = this.rcoLookup['DECISION'];
  }

  numberOfMonthesChanged(event,familyMember:FamilyMember){
    if(event.value>0){
      familyMember.committeeDecision.decision=this.rcoLookup['DECISION'][0];
    }else{
      familyMember.committeeDecision.decision=this.rcoLookup['DECISION'][1];
      familyMember.committeeDecision.amount=0;
    }
  }
  decisionChnaged(event,familyMember:FamilyMember){
    if(event.value.id==Globals.DECISION_DESERVE){
      familyMember.committeeDecision.numberOfMonthes=1;
 
    }else{
      familyMember.committeeDecision.numberOfMonthes=0;
      familyMember.committeeDecision.amount=0;
     
    }
  }
  initNumberOfMonths():void{
    for (let i = 0; i <= 6; i++) {
     this.numberOfMonthes.push({label:i.toString() , value:i});
      
    }
  }
  initAmount():void{
     this.amount.push({label:"40" , value:40});
     this.amount.push({label:"50" , value:50});
  }
}
