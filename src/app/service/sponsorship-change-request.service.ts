import { ChangeRequestApplicant } from './../domain/ChangeRequestApplicant';
import { SponsershipChangeRequest } from './../domain/SponsershipChangeRequest';
import { FamilyService } from './family.service';
import { FamilyMember } from './../domain/FamilyMember';
import { Resource } from './../common/resource';
import { UtilityService } from './utility.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';


@Injectable()
export class SponsorshipChangeRequestService {
    
    comments:Observable<{}>;

    constructor(private httpClient: HttpClient,private utilityService:UtilityService,private familyService:FamilyService,private logger:NGXLogger) { }
    getSponsorshipChangeRequestByFamilyId(familyId:number, applicantCpr:number)
    {
        let url = Resource.GET_SPONSORSHIP_CHANGE_REQUEST+applicantCpr+"/"+familyId;
        return this.httpClient.get(url);
    }
    getSponsorshipRequestById(id:number){

        return this.httpClient.get(Resource.GET_SPONSORSHIP_REQUEST_BY_ID+id);
    }
    validateParentsMarriageRelationship(fatherCpr:number , motherCpr:number){
    

      console.log("validateParentsMarriageRelationship father cpr = "+fatherCpr+" mother cpr = "+motherCpr)
      let URL=this.utilityService.replacePattern(Resource.VALIDATE_PARENTS_MARRIAGE_RELATIONSHIP,["{fatherCpr}","{motherCpr}"],[""+fatherCpr,""+motherCpr]);
       return this.httpClient.get(URL);
    }

    validateApplicant(applicant:ChangeRequestApplicant):boolean{
        if(applicant.cpr==null || applicant.cpr==undefined || applicant.cpr==0 || applicant.cpr.toString()==="")
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
    saveRequest(sponsershipChangeRequest:SponsershipChangeRequest){
       return this.httpClient.put(Resource.SAVE_SPONSORSHIP_CHANGE_REQUEST,sponsershipChangeRequest);
    }

    sendRequest(sponsershipChangeRequest:SponsershipChangeRequest){
        return this.httpClient.put(Resource.SAVE_SPONSORSHIP_CHANGE_REQUEST,sponsershipChangeRequest);
     }

}
