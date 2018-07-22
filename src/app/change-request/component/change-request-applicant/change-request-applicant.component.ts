import { Person } from './../../../domain/Person';
import { SponsershipChangeRequest } from './../../../domain/SponsershipChangeRequest';
import { Lookup } from './../../../domain/lookup';
import { ChangeRequestApplicant } from './../../../domain/ChangeRequestApplicant';
import { SponsershipRequest } from './../../../domain/SponsershipRequest';
import { UtilityService } from './../../../service/utility.service';
import { Message } from 'primeng/primeng';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { SharedService } from "../../../service/shared.service";
import { PersonService } from "../../../service/person.service";
import { Globals } from '../../../common/globals';
import { DatePipe } from '@angular/common';
import { Contact } from '../../../domain/Contact';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'change-request-applicant',
  templateUrl: './change-request-applicant.component.html',
  styleUrls: ['./change-request-applicant.component.css']
})
export class ChangeRequestApplicantComponent implements OnInit, OnChanges {

  @Input()
  sponsershipChangeRequest:SponsershipChangeRequest;
  @Input()
  isViewState:boolean;
  @Input()
  isUpdateState:boolean;
  @Input()
  rcoLookup:Lookup;

  @Output()
  changeRequestApplicantInfoRetrievedEvent=new EventEmitter<Person>();

  header:string;
  blockedApplicantPanel:boolean;
  disableCpr:boolean;
  personType:string="COMMON";

  applicant: ChangeRequestApplicant = new ChangeRequestApplicant();
  msgs:Message[]=[];


  constructor(
    private sharedService: SharedService,
    private globals:Globals,
    private personService: PersonService,
    private utilityService:UtilityService
  ) {}


  ngOnChanges(changes: any): void {
    let _sponsershipChangeRequest: SponsershipChangeRequest = changes.sponsershipChangeRequest.currentValue;
    if (_sponsershipChangeRequest ) 
    {
      if(_sponsershipChangeRequest.id)
      {
        this.applicant = _sponsershipChangeRequest.applicant;
        this.applicant.contact = _sponsershipChangeRequest.applicant.contact;
        this.applicant.requestChannel = _sponsershipChangeRequest.applicant.requestChannel;
    
      }
      else
      {
        this.applicant = new ChangeRequestApplicant();
        this.applicant.contact = new Contact();
      }
    }
  }

  ngOnInit() 
  {    
    this.header=this.globals.APPLICANT_HEADER;
  }
 

 
  getPersonCRS(cpr: any) 
  {  
    if(cpr!=undefined && cpr!=null && cpr !="")
    {
      this.blockedApplicantPanel=true;
      this.personService.getPerson(cpr,this.personType).subscribe(
        result => {
          this.msgs=[];
          let person=<Person>result;
         
         if( person.rejectionReasons != undefined && person.rejectionReasons.length == 0)
         {
          this.changeRequestApplicantInfoRetrievedEvent.emit(person);
          this.applicant.personArabicName=person.personArabicName;
          this.blockedApplicantPanel=false;
         }
         else
         {
          this.applicant = new ChangeRequestApplicant();
          person.rejectionReasons.forEach
          (value=>
          {
            this.msgs.push({severity:'error', detail:value});
          })
         }
         
          this.blockedApplicantPanel=false;
        },
        err => 
        {
          this.blockedApplicantPanel=false;
          this.applicant = new ChangeRequestApplicant();
          this.msgs=[];
          console.log(err);
        }
      );
    }
  }
}

