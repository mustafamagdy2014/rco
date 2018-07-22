import { FamilyMemberCR } from './../../domain/FamilyMemberCR';
import { BreadcrumbService } from './../../breadcrumb.service';
import { SharedService } from './../../service/shared.service';
import { FamilyMember } from './../../domain/FamilyMember';
import { UtilityService } from './../../service/utility.service';
import { NGXLogger } from 'ngx-logger';
import { AppService } from './../../service/app.service';
import { SponsorshipChangeRequestService } from './../../service/sponsorship-change-request.service';
import { Location } from '@angular/common';
import { RcoMessage } from './../../common/rco-message';
import { FamilyService } from './../../service/family.service';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { ComponentManager } from './../../common/componentManager';
import { SponsershipChangeRequest } from './../../domain/SponsershipChangeRequest';
import { Applicant } from './../../domain/Applicant';
import { Family } from './../../domain/Family';
import { Message } from 'primeng/primeng';
import { Person } from "../../domain/person";
import {ActivatedRoute, Router} from "@angular/router";
import { FormGroup } from '@angular/forms';
import { TopicComponent } from '../component/topic/topic.component';
import { ChangeRequestService } from '../../service/change-request.service';
import { Globals } from '../../common/globals';
import { SponserCR } from '../../domain/SponserCR';
import { Contact } from '../../domain/Contact';
import { Account } from '../../domain/Account';
import { AssigneesComponent } from '../../assignees/assignees.component';


@Component({
  selector: 'change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.css'],
  providers:[ChangeRequestService]
})
export class ChangeRequestComponent implements OnInit
{
  componentManager:ComponentManager;
  rcoLookup:any;

  sponsershipChangeRequest:SponsershipChangeRequest;
  applicant:Person;
  family:Family;
  beneficiaryCpr:any;
  familyMember:FamilyMember;
  familyMemberCR:FamilyMemberCR;
  //true incase of widow view , orphan view and family members view
  isViewState:boolean;
  //true incase of UpdatesFamilyMonthlySponsorshipRequest
  isUpdateState:boolean;
  isSponsershipChangeRequest:boolean = true;
  taskId:string;    //available when update
  stageName:string;   //available when update
  requestId:number; //available when update 

  father:Person;
  mother:Person;
  msgs:Message[]=[];
  blockedParentPanel:boolean;
  @ViewChild("dynamicForm") dynamicForm:TopicComponent;
  @ViewChild("assigneesComponent") assigneesComponent :AssigneesComponent;

  constructor(private breadcrumbService:BreadcrumbService,private route:ActivatedRoute,private _location: Location,private router : Router,private familyService:FamilyService,private utility:UtilityService,private sponsorshipChangeRequestService:SponsorshipChangeRequestService,private logger:NGXLogger,private appService:AppService,private changeRequestService:ChangeRequestService,private sharedService:SharedService) {  
    
  }

  ngOnInit() 
  {
    this.rcoLookup=this.route.snapshot.data.data;
    this.breadcrumbService.setItems([{label:Globals.BREADCRUMB_CHANGE_REQUEST}]);
    this.route.params.subscribe(params=>
      {
        let familyId=this.utility.decode(params["familyId"]);
        this.beneficiaryCpr=this.utility.decode(params["applicantCpr"]);
        this.taskId=this.utility.decode(params["taskId"]);
        this.stageName=this.utility.decode(params["stageName"]);
        this.getSponsorshipChangeRequestByFamilyId(familyId);
      }
    );
  
    this.componentManager=new ComponentManager("updateMonthlySponsershipChangeRequest",null,this.appService.User.authorities);

  }

  getSponsorshipChangeRequestByFamilyId(_familyId:any):void{
    this.sponsorshipChangeRequestService.getSponsorshipChangeRequestByFamilyId(Number(_familyId),Number(this.beneficiaryCpr)).subscribe(
      result=>
      {
        
        this.sponsershipChangeRequest=<SponsershipChangeRequest> result;
        this.familyMemberCR=this.familyService.getFamilyMemberCrByCpr(this.sponsershipChangeRequest.familyChangeRequest,this.beneficiaryCpr);
        this.family=this.sponsershipChangeRequest.family;
        this.familyMember=this.familyService.getFamilyMemberByCpr(this.family,this.beneficiaryCpr);
      });
  }

  validateMeetingStage(){
    let value = (this.stageName==="under committee study"?true:false);
    return value;
  }
  saveRequest(save:boolean){
    this.logger.debug("save change request");
    this.msgs=[];
    
    this.changeRequestService.fillChangeRequestValues(this.dynamicForm.form.getRawValue() , this.sponsershipChangeRequest,this.dynamicForm.familyMemberCR);

    //validate change request applicant

    if(!this.sponsorshipChangeRequestService.validateApplicant( this.sponsershipChangeRequest.applicant)){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_APPLICANT_CPR});
      window.scroll(0,0);
      return;
    }
    
    // if(!this.sponsorshipRequestService.validateFamilyMembers( this.family.familyMembers)){
    //   this.msgs.push({severity:'error', detail:RcoMessage.FAMILY_MEMBERS_DETAILS_MISSING});
    //   window.scroll(0,0);
    //   return;
    // }

    // this.sponsershipRequest.family=this.family;

   // let father = this.familyService.getFamilyMemberByCode(this.family,["FATHER"])[0];
  //  father.account={...this.sponsershipRequest.family.familyMembers[1].account};
   // this.sponsershipRequest.family.familyMembers[this.sponsershipRequest.family.familyMembers.indexOf(father)]=father;
   // debugger

   if(save){

    this.sponsorshipChangeRequestService.saveRequest(this.sponsershipChangeRequest).subscribe(result=>{
      this.sharedService.globalMessageEvent.emit({message:RcoMessage.REQUEST_SENT_SUCCESSFULLY,type:"success"});
      this.router.navigate(["viewApplicantList"]);
    }
    ,err => {
      this.sharedService.globalMessageEvent.emit({message:RcoMessage.REQUEST_SENT_FAILED,type:"error"});
     this.logger.debug(err);
    });


   }else{ //send

     if (this.assigneesComponent) {
       this.sponsershipChangeRequest.assigneeDetails = this.assigneesComponent.assignee;
     }

    this.sponsorshipChangeRequestService.sendRequest(this.sponsershipChangeRequest).subscribe(result=>{
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

  updateApplicantInfo($event)
  {
    this.applicant=$event;
    this.sponsershipChangeRequest.applicant.cpr=this.applicant.cpr;
    this.sponsershipChangeRequest.applicant.personArabicName=this.applicant.personArabicName;
    this.sponsershipChangeRequest.applicant.personEnglishName=this.applicant.personEnglishName;
  }

//     if(this.router.url.includes("/updateMonthlySponsershipRequest")){//update sponsership request
//       this.isViewState=false;
//       this.isUpdateState=true;

     

//       this.route.params.subscribe(params=>{
//         this.taskId=this.utility.decode(params["taskId"]);
//         this.requestId=+this.utility.decode(params["requestId"]);
//          this.getSponsorshipRequestById(this.requestId);

//          this.componentManager=new ComponentManager("updateMonthlySponsershipRequest",null,this.appService.User.authorities);

//       });

//     }
//     else if(this.router.url.includes("/view-person-info")){// widow view , orphan view and family members view
//       this.isViewState=true;
//       this.applicant=new Applicant();

//       this.route.params.subscribe(params=>{
//         this.applicant.cpr=this.utility.decode(params["applicantCpr"]);
//         this.applicant.familyRelationCode=+this.utility.decode(params["applicantFamilyRelationCode"]);
//         this.applicant.familyId=+this.utility.decode(params["applicantFamilyId"]);

//         //this.getFamilyInfo(+this.utility.decode(params["familyId"]));
//          this.getSponsorshipRequestByFamilyId(+this.utility.decode(params["familyId"]));

//          this.componentManager=new ComponentManager("", this.applicant.familyRelationCode);

//       });

//     }else if(this.router.url.includes("/applyforMonthlySponsership")){//apply new request
//       this.isViewState=false;
//       this.isUpdateState=false;
//       this.logger.debug("applyforMonthlySponsership");
//       this.componentManager=new ComponentManager("applyforMonthlySponsership");

//     }


//   }

//   getFamilyInfo(familyId:number){
//     this.logger.debug("enter get family info , family id ",familyId);

//     this.familyService
//     .getFamily(familyId)
//     .subscribe(
//       result => {
//       this.family = <Family>result;
//       },
//       err => {
//        this.logger.debug(err);
//       }
//     );
//   }

//   getSponsorshipRequestByFamilyId(familyId:any){
//     this.sponsorshipChangeRequestService.getSponsorshipRequestByFamilyId(familyId).subscribe(
//       result => {
//       this.sponsershipChangeRequest = <SponsershipChangeRequest>result;
//       this.family= this.sponsershipChangeRequest.family;
//       console.log(this.sponsershipChangeRequest)
//       },
//       err => {
//        this.logger.error(err);
//       }
//     );
//   }

//   getSponsorshipRequestById(id:any){
//     this.sponsorshipChangeRequestService.getSponsorshipRequestById(id).subscribe(
//       result => {
//       this.sponsershipChangeRequest = <SponsershipChangeRequest>result;
//       this.family= this.sponsershipChangeRequest.family;
//       this.sponsershipChangeRequest.taskId=this.taskId;
//       console.log(this.sponsershipChangeRequest)
//       },
//       err => {
//        this.logger.debug(err);
//       }
//     );
//   }


//   validateParentsMarriageRelationship($event){
//     if(!this.isViewState&&!this.isUpdateState){

//       if($event["gender"]==="M"){
//         this.father=$event;
//         this.logger.debug("validateParentsMarriageRelationship event is fired for FATHER");
//       }else{
//         this.mother=$event;
//         this.logger.debug("validateParentsMarriageRelationship event is fired for MOTHER");
//       }
//       if(this.father && this.father!=null && this.mother&&this.mother!=null){
//         this.blockedParentPanel=true;

//         this.sponsorshipChangeRequestService.validateParentsMarriageRelationship(this.father.cpr , this.mother.cpr).subscribe(result=>{
//           this.msgs=[];
//         let sponsershipReq=<SponsershipChangeRequest>result;
//         console.log(sponsershipReq);
//         if(sponsershipReq&&sponsershipReq.rejectionReasons.length==0 ){
//           this.sponsershipChangeRequest=<SponsershipChangeRequest>result;
//           this.family=this.sponsershipChangeRequest.family;
//           this.logger.debug("new marriage relationship");
//         }else{
//           this.family=new Family();
//           this.sponsershipChangeRequest=new SponsershipChangeRequest( this.family);
//           sponsershipReq.rejectionReasons.forEach(value => {
//             this.msgs.push({severity:'error', detail:value});
//           });
//         }

//         this.blockedParentPanel=false;
//       });

//       }
//    }

//   }

//  /* createSponsershipRequest($event){
//     this.logger.debug("createSponsershipRequest event is fired ");
//     if($event["gender"]==="M"){
//       this.father=$event;
//     }else{
//       this.mother=$event;
//     }
//     if(this.father && this.father!=null && this.mother&&this.mother!=null){

//       this.sponsorshipChangeRequestService.createSponsershipRequest(this.father.cpr , this.mother.cpr).subscribe(result=>{
//         this.msgs=[];
//       let sponsershipReq=<SponsershipChangeRequest>result;
//       if(sponsershipReq.rejectionReasons&&sponsershipReq.rejectionReasons!=null && sponsershipReq.rejectionReasons.length==0){
//         this.sponsershipChangeRequest=<SponsershipChangeRequest>result;
//         this.family=this.sponsershipChangeRequest.family;
//         this.logger.debug("new rec request is created with id = "+  this.sponsershipChangeRequest.id);
//       }else{

//         sponsershipReq.rejectionReasons.forEach(value => {
//           this.msgs.push({severity:'error', detail:value});
//         });
//       }
//     });

//     }
//   }*/

//   saveRequest(save:boolean){
//     this.logger.debug("save request");
//     this.msgs=[];
//     if(!this.sponsorshipChangeRequestService.validateApplicant( this.sponsershipChangeRequest)){
//       this.msgs.push({severity:'error', detail:RcoMessage.ENTER_APPLICANT_CPR});
//       window.scroll(0,0);
//       return;
//     }
//     if(!this.sponsorshipChangeRequestService.validateFamilyMembers( this.family.familyMembers)){
//       this.msgs.push({severity:'error', detail:RcoMessage.FAMILY_MEMBERS_DETAILS_MISSING});
//       window.scroll(0,0);
//       return;
//     }

//     this.sponsershipChangeRequest.family=this.family;

//    // let father = this.familyService.getFamilyMemberByCode(this.family,["FATHER"])[0];
//   //  father.account={...this.sponsershipChangeRequest.family.familyMembers[1].account};
//    // this.sponsershipChangeRequest.family.familyMembers[this.sponsershipChangeRequest.family.familyMembers.indexOf(father)]=father;
//    // debugger

//    if(save){

//     this.sponsorshipChangeRequestService.saveRequest(this.sponsershipChangeRequest).subscribe(result=>{
//       this.router.navigate(["viewApplicantList"]);
//     }
//     ,err => {
//      this.logger.debug(err);
//     });


//    }else{ //send


//     this.sponsorshipChangeRequestService.sendRequest(this.sponsershipChangeRequest).subscribe(result=>{
//       this.router.navigate(["viewApplicantList"]);
//     }
//     ,err => {
//      this.logger.debug(err);
//     });


//    }

//     window.scroll(0,0);
   
//   }
//   backClicked() {
//     this._location.back();
//   }
}

