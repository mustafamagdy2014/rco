import { Globals } from './../common/globals';
import { SharedService } from './shared.service';
import { FamilyMember } from './../domain/FamilyMember';
import { FamilyCR } from './../domain/FamilyCR';
import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Resource } from "../common/resource";
import { Family } from "../domain/Family";
import { HttpClient } from "@angular/common/http";
import { FamilyMemberCR } from '../domain/FamilyMemberCR';
import { RcoMessage } from '../common/rco-message';
@Injectable()
export class FamilyService {
  constructor(private http: HttpClient,private sharedService:SharedService) {}

  createGetHeader(headers: Headers) {
   // headers.append("Authorization", "Bearer "+this._service.getAccessToken());
  }

  getApplicants() {
      return this.http.get(Resource.GET_APPLICANTS_URL);
  }

  getFamily(familyId: number) {
    return this.http.get(Resource.GET_FAMILY_URL + familyId);
  }

  getLastMarriage(cpr: number){
    return this.http.get(Resource.GET_MARITAL_STATUS + cpr);
  }

  haveChildern(cpr: String){
    return this.http.get(Resource.GET_HAVE_CHILDERN + cpr);
  }

  setBeneficiaryStatus(familyMembers: FamilyMember[],rcoLookup:any) {
    for (let i = 0; i < familyMembers.length; i++) {
      if(familyMembers[i].committeeDecision.decision.id==Globals.DECISION_NOT_DESERVE){
        familyMembers[i].beneficiaryStatus=rcoLookup["BENEFICIARY_STATUS"][3];
      }else if(familyMembers[i].committeeDecision.decision.id==Globals.DECISION_DESERVE){
        familyMembers[i].beneficiaryStatus=rcoLookup["BENEFICIARY_STATUS"][1];
      }

    }
  }
  setPaymentStartDate(familyMembers: FamilyMember[],paymentStartDate:Date){
   
    for (let i = 0; i < familyMembers.length; i++) {
        familyMembers[i].committeeDecision.startDate=paymentStartDate;

    }
  }
  getFamilyMemberByCode(family:Family , codes:string[]):FamilyMember[]{
    let familyMembers=[];
    if(family&&family.familyMembers){
      family.familyMembers.forEach(familyMember => {
        codes.forEach(code => {
          if(familyMember.familyRelationCode.code===code){
            familyMembers.push(familyMember);
          }
        });
    });
  }
    return familyMembers;
  }

  getFamilyMemberByCpr(family:Family , cpr:string):FamilyMember{
    if(family!=undefined&&family.familyMembers!=undefined&&family.familyMembers!=null){
      let familyMembers = family.familyMembers.filter(fm=> fm.cpr==cpr);
      return familyMembers[0];
  }
    return null;
  }

  getFamilyMemberCrByCpr(family:FamilyCR , cpr:string):FamilyMemberCR{
    if(family!=undefined&&family.familyMembers!=undefined&&family.familyMembers!=null){
      let familyMembers = family.familyMembers.filter(fm=> fm.cpr==cpr);
      return familyMembers[0];
  }
    return null;
  }

}
