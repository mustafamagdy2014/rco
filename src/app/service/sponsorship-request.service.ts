import { FamilyService } from './family.service';
import { FamilyMember } from './../domain/FamilyMember';
import { Resource } from './../common/resource';
import { SponsershipRequest } from './../domain/SponsershipRequest';
import { UtilityService } from './utility.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { Globals } from '../common/globals';


@Injectable()
export class SponsorshipRequestService {
    
    comments:Observable<{}>;

    constructor(private httpClient: HttpClient,private utilityService:UtilityService,private familyService:FamilyService,private logger:NGXLogger) { }
    getSponsorshipRequestByFamilyId(familyId:number){

        return this.httpClient.get(Resource.GET_SPONSORSHIP_REQUEST_BY_FAMILY_ID+familyId);
    }
    getSponsorshipRequestById(id:number){

        return this.httpClient.get(Resource.GET_SPONSORSHIP_REQUEST_BY_ID+id);
    }
    validateParentsMarriageRelationship(fatherCpr:number , motherCpr:number){
    

      console.log("validateParentsMarriageRelationship father cpr = "+fatherCpr+" mother cpr = "+motherCpr)
      let URL=this.utilityService.replacePattern(Resource.VALIDATE_PARENTS_MARRIAGE_RELATIONSHIP,["{fatherCpr}","{motherCpr}"],[""+fatherCpr,""+motherCpr]);
       return this.httpClient.get(URL);
    }

    validateApplicant(request:SponsershipRequest):boolean{
        if(request.applicantCpr==null || request.applicantCpr==undefined || request.applicantCpr==0 || request.applicantCpr.toString()==="")
            return false;

        return true;
    }
    //validate that every family member has a next of kin and sponser with bank account
    validateFamilyMembers(familyMembers:FamilyMember[]):boolean{
        
       for (let i = 0; i < familyMembers.length; i++) {
           if(familyMembers[i].familyRelationCode.code!=="FATHER"){
            if(familyMembers[i].nextOfKin==null||familyMembers[i].nextOfKin.cpr==undefined||familyMembers[i].sponser==null||familyMembers[i].sponser.cpr==undefined||familyMembers[i].account==null){
                return false;
              }
           }
           
           
       }
        return true;
    }

    isFamilyMembersAmountEntered(familyMembers:FamilyMember[]):boolean{
            for (let i = 0; i < familyMembers.length; i++) {
                if(familyMembers[i].familyRelationCode.code!=="FATHER"&&familyMembers[i].committeeDecision!=null&&familyMembers[i].committeeDecision!=undefined&&familyMembers[i].committeeDecision.decision.id==Globals.DECISION_DESERVE){
                 if(familyMembers[i].committeeDecision.amount==null||familyMembers[i].committeeDecision.amount===0){
                     return false;
                   }
                }
            }
      
        return true;
    }
    
    isPaymentDateEntered(paymentStartDate:Date){
        if(paymentStartDate == undefined ||paymentStartDate==null){
            return false;
        }

        return true;
    }
    saveRequest(sponsershipRequest:SponsershipRequest){
       return this.httpClient.put(Resource.SAVE_SPONSORSHIP_REQUEST,sponsershipRequest);
    }

    sendRequest(sponsershipRequest:SponsershipRequest){
        return this.httpClient.post(Resource.POST_SPONSORSHIP_REQUEST,sponsershipRequest);
     }

}
