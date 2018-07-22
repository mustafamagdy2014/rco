import { BreadcrumbService } from './../../../breadcrumb.service';
import { Globals } from './../../../common/globals';
import { Contact } from './../../../domain/Contact';
import { FamilyMember } from './../../../domain/FamilyMember';
import { Account } from './../../../domain/Account';
import { ComponentManager } from './../../../common/componentManager';
import { SponsershipRequest } from './../../../domain/SponsershipRequest';
import { Applicant } from './../../../domain/Applicant';
import { FamilyService } from '../../../service/family.service';
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import {ActivatedRoute, Router } from "@angular/router";
import { NGXLogger } from 'ngx-logger';
import { UtilityService } from '../../../service/utility.service';
import { SponsorshipRequestService } from '../../../service/sponsorship-request.service';
import { Person } from '../../../domain/person';
import { Message } from 'primeng/primeng';
import { Family } from '../../../domain/Family';
import { RcoMessage } from '../../../common/rco-message';
import { AppService } from '../../../service/app.service';
import { SharedService } from '../../../service/shared.service';
import { WidowComponent } from '../../component/widow/widow.component';
import { CommitteeDiscussComponent } from '../../../committee/committee-discuss/committee-discuss.component';
import { AssigneesComponent } from '../../../assignees/assignees.component';

@Component({
  selector: "app-view-person-info",
  templateUrl: "./view-person-info.component.html",
  styleUrls: ["./view-person-info.component.scss"]
})
export class ViewPersonInfoComponent implements OnInit {

  @ViewChild("widow")
  widow:WidowComponent;

  componentManager:ComponentManager;
  rcoLookup:any;

  sponsershipRequest:SponsershipRequest;
  family:Family;
  applicant:Applicant;
  //true incase of widow view , orphan view and family members view
  isViewState:boolean;
  //true incase of UpdatesFamilyMonthlySponsorshipRequest
  isUpdateState:boolean;
  taskId:string;    //available when update
  stageName:string; //available when update
  requestId:number; //available when update 

  father:Person;
  mother:Person;
  msgs:Message[]=[];
  growlMsgs:Message[]=[];
  blockedParentPanel:boolean;
  @ViewChild("committeeDiscuss") committeeDiscussComponent:CommitteeDiscussComponent;
  @ViewChild("assigneesComponent") assigneesComponent :AssigneesComponent;


  constructor(private route:ActivatedRoute,private breadcrumbService:BreadcrumbService,private _location: Location,private router : Router,private familyService:FamilyService,private utility:UtilityService,private sponsorshipRequestService:SponsorshipRequestService,private logger:NGXLogger,private appService:AppService,private sharedService:SharedService) {  

    this.family=new Family();
    this.sponsershipRequest=new SponsershipRequest(this.family);


  }

  ngOnInit() {
    
    this.rcoLookup=this.route.snapshot.data.data;

    if(this.router.url.includes("/updateMonthlySponsershipRequest")){//update sponsership request
      this.isViewState=false;
      this.isUpdateState=true;

      this.route.params.subscribe(params=>{
        this.taskId=this.utility.decode(params["taskId"]);
        this.stageName=this.utility.decode(params["stageName"]);
        this.requestId=+this.utility.decode(params["requestId"]);
         this.getSponsorshipRequestById(this.requestId);

         this.componentManager=new ComponentManager("updateMonthlySponsershipRequest",null,this.appService.User.authorities);

      });
      this.initBreadcrumb(Globals.BREADCRUMB_REVIEW_SPONSERSHIP_REQUEST);
    }
    else if(this.router.url.includes("/view-person-info")){// widow view , orphan view
      this.isViewState=true;
      this.applicant=new Applicant();

      this.route.params.subscribe(params=>{
        this.applicant.cpr=this.utility.decode(params["applicantCpr"]);
        this.applicant.familyRelationCode=+this.utility.decode(params["applicantFamilyRelationCode"]);
        this.applicant.familyId=+this.utility.decode(params["applicantFamilyId"]);

         this.getSponsorshipRequestByFamilyId(+this.utility.decode(params["familyId"]));

         this.componentManager=new ComponentManager("", this.applicant.familyRelationCode);

      });
      this.initBreadcrumb(Globals.BREADCRUMB_INDIVIDUAL_INFO);

    }else if(this.router.url.includes("/view-family-members-info")){// family members view
      this.isViewState=true;
      this.route.params.subscribe(params=>{
         this.getSponsorshipRequestByFamilyId(+this.utility.decode(params["familyId"]));
         this.componentManager=new ComponentManager("view-family-members-info");

      });
      this.initBreadcrumb(Globals.BREADCRUMB_FAMILY_MEMBERS_INFO);

    }
    else if(this.router.url.includes("/applyforMonthlySponsership")){//apply new request
      this.isViewState=false;
      this.isUpdateState=false;
      this.logger.debug("applyforMonthlySponsership");
      this.componentManager=new ComponentManager("applyforMonthlySponsership");
      this.initBreadcrumb(Globals.BREADCRUMB_NEW_SPONSERSHIP_REQUEST);

    }


  }

  initBreadcrumb(value) {
    this.breadcrumbService.setItems([
      { label: value }
    ]);
  }
  getFamilyInfo(familyId:number){
    this.logger.debug("enter get family info , family id ",familyId);

    this.familyService
    .getFamily(familyId)
    .subscribe(
      result => {
      this.family = <Family>result;
      },
      err => {
       this.logger.debug(err);
      }
    );
  }

  getSponsorshipRequestByFamilyId(familyId:any){
    this.growlMsgs=[];
    this.sponsorshipRequestService.getSponsorshipRequestByFamilyId(familyId).subscribe(
      result => {
        if(result !=null && result["id"]!=null){
          this.sponsershipRequest = <SponsershipRequest>result;
          this.family= this.sponsershipRequest.family;
         // console.log(this.sponsershipRequest)
        }else{
          this.growlMsgs.push({severity:'error', detail:RcoMessage.NO_REQUEST_FOUND});
          this.blockedParentPanel=true;
        }
    
      },
      err => {
       this.logger.error(err);
      }
    );
  }

  getSponsorshipRequestById(id:any){
    this.growlMsgs=[];
    this.sponsorshipRequestService.getSponsorshipRequestById(id).subscribe(
      result => {
        if(result !=null && result["id"]!=null){
          this.sponsershipRequest = <SponsershipRequest>result;
          this.family= this.sponsershipRequest.family;
          this.sponsershipRequest.taskId=this.taskId;
          console.log(this.sponsershipRequest)
        }else{
          this.growlMsgs.push({severity:'error', detail:RcoMessage.NO_REQUEST_FOUND});
          this.blockedParentPanel=true;
        }
      },
      err => {
       this.logger.debug(err);
      }
    );
  }


  validateParentsMarriageRelationship($event){
    if(!this.isViewState&&!this.isUpdateState){

      if($event["gender"]==="M"){
        this.father=$event;
        this.logger.debug("validateParentsMarriageRelationship event is fired for FATHER");
      }else{
        this.mother=$event;
        this.logger.debug("validateParentsMarriageRelationship event is fired for MOTHER");
      }
      if(this.father && this.father!=null && this.mother&&this.mother!=null){
        this.blockedParentPanel=true;

        this.sponsorshipRequestService.validateParentsMarriageRelationship(this.father.cpr , this.mother.cpr).subscribe(result=>{
          this.msgs=[];
        let sponsershipReq=<SponsershipRequest>result;
        console.log(sponsershipReq);
        if(sponsershipReq&&sponsershipReq.rejectionReasons.length==0 ){
          this.sponsershipRequest=<SponsershipRequest>result;
          this.family=this.sponsershipRequest.family;
          this.logger.debug("new marriage relationship");
        }else{
          this.family=new Family();
          this.sponsershipRequest=new SponsershipRequest( this.family);
          sponsershipReq.rejectionReasons.forEach(value => {
            this.msgs.push({severity:'error', detail:value});
          });
        }

        this.blockedParentPanel=false;
      },error=>{
        this.logger.error("error while validateParentsMarriageRelationship "+error);
        this.blockedParentPanel=false;
      });

      }
   }

  }

  updateMotherContact(){
    let _mother :FamilyMember=this.familyService.getFamilyMemberByCode(this.family,["WIDOW","MOTHER"])[0];
    if(!_mother.contact){
      _mother.contact=new Contact();
    }
    _mother.contact.mobilesms=this.widow.mobilesms.value;
    _mother.contact.mobile=this.widow.mobile.value;
    _mother.contact.homeTel=this.widow.homeTel.value;
  }

  saveRequest(save:boolean){
    this.logger.debug("save request");
    this.msgs=[];
    if(!this.sponsorshipRequestService.validateApplicant( this.sponsershipRequest)){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_APPLICANT_CPR});
      window.scroll(0,0);
      return;
    }
    if(!this.sponsorshipRequestService.validateFamilyMembers( this.family.familyMembers)){
      this.msgs.push({severity:'error', detail:RcoMessage.FAMILY_MEMBERS_DETAILS_MISSING});
      window.scroll(0,0);
      return;
    }

  

    this.updateMotherContact();
    this.sponsershipRequest.family=this.family;

 
   if(this.appService.hasRole("ROLE_COMMITTEE_SECRETARY")&&this.validateMeetingStage()){
    this.familyService.setBeneficiaryStatus(this.family.familyMembers,this.rcoLookup);

    if(!this.sponsorshipRequestService.isFamilyMembersAmountEntered( this.family.familyMembers)){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_FAMILY_MEMBERS_AMOUNT});
      window.scroll(0,0);
      return;
    }

    if(!this.sponsorshipRequestService.isPaymentDateEntered(this.committeeDiscussComponent.startDate)){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_PAYMENT_START_DATE});
      window.scroll(0,0);
      return;
    }
    this.familyService.setPaymentStartDate(this.family.familyMembers,this.committeeDiscussComponent.startDate);
 
   }
   if(save){

    this.sponsorshipRequestService.saveRequest(this.sponsershipRequest).subscribe(result=>{
      this.sharedService.globalMessageEvent.emit({message:RcoMessage.REQUEST_SENT_SUCCESSFULLY,type:"success"});
      this.router.navigate(["viewApplicantList"]);
    }
    ,err => {
      this.sharedService.globalMessageEvent.emit({message:RcoMessage.REQUEST_SENT_FAILED,type:"error"});
     this.logger.debug(err);
    });


   }else{ //send
     if (this.assigneesComponent) {
       this.sponsershipRequest.assigneeDetails = this.assigneesComponent.assignee;
     }

    this.sponsorshipRequestService.sendRequest(this.sponsershipRequest).subscribe(result=>{
      this.sharedService.globalMessageEvent.emit({message:RcoMessage.REQUEST_SENT_SUCCESSFULLY,type:"success"});
      this.router.navigate(["viewApplicantList"]);
    }
    ,err => {
      this.sharedService.globalMessageEvent.emit({message:RcoMessage.REQUEST_SENT_FAILED,type:"error"});
     this.logger.debug(err);
    });


   }

    window.scroll(0,0);
   
  }
  validateMeetingStage(){
    let value = (this.stageName==="under committee study"?true:false);
    return value;
  }
  backClicked() {
    this._location.back();
  }
  hideChangeRequestBTN(){
    if(this.router.url.includes("/view-family-members-info")){
      return true;
    }
    return false;
  }
}
