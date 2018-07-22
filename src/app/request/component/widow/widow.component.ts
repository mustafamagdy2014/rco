import { WidowValidationService } from './../../../service/widow-validation.service';
import { SharedService } from '../../../service/shared.service';
import { Family } from './../../../domain/Family';

import { Component, OnInit, Input, OnChanges, Output,EventEmitter, ViewChild } from "@angular/core";
import { PersonService } from "../../../service/person.service";
import { Person } from "../../../domain/person";
import { Globals } from '../../../common/globals';
import { Message, Checkbox } from 'primeng/primeng';
import { FamilyMember } from '../../../domain/FamilyMember';
import { FamilyService } from '../../../service/family.service';
import { RcoMessage } from '../../../common/rco-message';
import { FormControl } from '@angular/forms';
import { Contact } from '../../../domain/Contact';

@Component({
  selector: "widow",
  templateUrl: "./widow.component.html",
  styleUrls: ["./widow.component.scss"],
  providers:[WidowValidationService]
})
export class WidowComponent implements OnInit ,OnChanges {
 
  @Input()
  family:Family;
  @Input()
  isViewState:boolean;
  @Input()
  isUpdateState:boolean;
  @Output()
  personRetrievedEvent=new EventEmitter<Person>();

  @ViewChild("nxOfKn")
  isNextOfKin:Checkbox;
  @ViewChild("mobilesms")
  mobilesms:FormControl;
  @ViewChild("mobile")
  mobile:FormControl;
  @ViewChild("homeTel")
  homeTel:FormControl;

  header:string;
  blockedWidowPanel:boolean;
  motherFamilyMember:FamilyMember;

  motherCPR: string;
  mother:Person = new Person();
  //isNextOfKin:boolean;
  

  inputDateAvailable:boolean=false;
  personType:string="WIDOW";
  msgs:Message[]=[];
  constructor(
    private globals:Globals,
    private personService: PersonService,
    private familyService:FamilyService,
    private sharedService:SharedService,
    private widowValidationService:WidowValidationService
  ) {}

  ngOnInit() {
    this.header=this.globals.WIDOW_HEADER;
    this.motherFamilyMember=new FamilyMember();
    this.motherFamilyMember.contact=new Contact();
  }

  ngOnChanges(changes:any):void {
    let _family:Family = changes.family.currentValue;
    if (_family.id&&!this.inputDateAvailable) { // && this.isViewState&&!this.inputDateAvailable
        this.getPersonData();
        this.getPersonCRS(this.motherCPR);
        this.inputDateAvailable=true;
    }
    this.motherFamilyMember=this.familyService.getFamilyMemberByCode(this.family,["WIDOW","MOTHER"])[0];
  }
    

  getPersonData() {
    if (this.family!=undefined &&this.family.id!=undefined && this.family.familyMembers) {
      this.family.familyMembers.forEach(member => {
        if (
          member.familyRelationCode.code == "MOTHER" ||
          member.familyRelationCode.code == "WIDOW"
        ) {
          this.motherCPR = member.cpr;
        }
      });
    }
  }

  getPersonCRS(cpr: any) {
    this.blockedWidowPanel=true;
  console.log("widow getPersonCRS");
    this.personService.getPerson(cpr,this.personType).subscribe(
      result => {
        this.msgs=[];
        let person=<Person>result;
         
        if( person.rejectionReasons!=undefined &&person.rejectionReasons.length==0){
         this.mother = <Person>result;
         this.personRetrievedEvent.emit(this.mother);
        }else{
         person.rejectionReasons.forEach(value=>{
           this.msgs.push({severity:'error', detail:value});
         })
        }

        this.blockedWidowPanel=false;
        
      },
      err => {
        this.blockedWidowPanel=false;
        this.msgs=[];
        console.log(err);
      }
    );
  }

  widowAsApplicantChecked(state:Boolean){
    this.sharedService.widowAsApplicant.emit({mother:this.mother,isChecked :state});
  }

   widowAsNextOfKinChecked(state:boolean){
    this.msgs=[];
    this.mother.contact={...this.motherFamilyMember.contact};
    if(state){
      if(this.widowValidationService.checkWidowContactDetails(this.mother.contact))
      this.sharedService.widowAsNextOfKin.emit({mother:this.mother,isChecked :state});
      else{
        this.isNextOfKin.checked=false;
        this.msgs.push({severity:'error', detail:RcoMessage.ENTER_MOBILE_NUMBER});
      }
    }else{
      this.sharedService.widowAsNextOfKin.emit({mother:this.mother,isChecked :state});
    }
  
   
  } 

 
}
