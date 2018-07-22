import { Applicant } from './../../../domain/Applicant';
import { SponsershipRequest } from './../../../domain/SponsershipRequest';
import { UtilityService } from './../../../service/utility.service';
import { Message } from 'primeng/primeng';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { SharedService } from "../../../service/shared.service";
import { Person } from "../../../domain/person";
import { PersonService } from "../../../service/person.service";
import { Globals } from '../../../common/globals';
import { DatePipe } from '@angular/common';

@Component({
  selector: "applicant",
  templateUrl: "./applicant.component.html",
  styleUrls: ["./applicant.component.scss"]
})
export class ApplicantComponent implements OnInit ,OnChanges{
  
  @Input()
  sponsershipRequest:SponsershipRequest;
  @Input()
  isViewState:boolean;
  @Input()
  isUpdateState:boolean;

  header:string;
  blockedApplicantPanel:boolean;
  disableCpr:boolean;

  applicant: Person = new Person();
  personType:string="APPLICANT";

  constructor(
    private sharedService: SharedService,
    private globals:Globals,
    private personService: PersonService,
    private utilityService:UtilityService
  ) {}

  ngOnInit() {
    this.header=this.globals.APPLICANT_HEADER;
  
    this.sharedService.widowAsApplicant.subscribe(event=>{
      if(event["isChecked"]){
        this.disableCpr=true;
        this.getPersonCRS(event.mother["cpr"]);
      }else if(event.mother["cpr"]==this.applicant.cpr){
        this.disableCpr=false;
        this.applicant = new Person();
      }
      
    });


  }
  ngOnChanges(changes:any):void {
   let sponsershipReq:SponsershipRequest = changes.sponsershipRequest.currentValue;
   
    if (sponsershipReq&&sponsershipReq.id) { // && this.isViewState
      let _applicantCpr:string =sponsershipReq.applicantCpr.toString();
        this.getPersonCRS(_applicantCpr);
    }
  }

 


  getPersonCRS(cpr: any) {
    
    if(cpr!=undefined && cpr!=null && cpr !=""){
      this.blockedApplicantPanel=true;
      this.personService.getPerson(cpr,this.personType).subscribe(
        result => {
          let person=<Person>result;
         
         if( person.rejectionReasons!=undefined &&person.rejectionReasons.length==0){
          this.applicant = <Person>result;
          this.sponsershipRequest.applicantCpr=this.applicant.cpr;
         }else{
          this.applicant=new Person();
          person.rejectionReasons.forEach(value=>{
            this.sharedService.globalMessageEvent.emit({message:value,type:"error"});
          })
          this.disableCpr=false;
         }
         
          this.blockedApplicantPanel=false;
        },
        err => {
          this.blockedApplicantPanel=false;
          this.applicant=new Person();
          console.log(err);
        }
      );
    }
  
  }
}
