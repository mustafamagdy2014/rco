import { Account } from './../domain/Account';
import { Globals } from './../common/globals';
import { Injectable } from '@angular/core';
import { SponsershipChangeRequest } from '../domain/SponsershipChangeRequest';
import { Sponser } from '../domain/Sponser';
import { Contact } from '../domain/Contact';
import { FamilyMemberCR } from '../domain/FamilyMemberCR';
import { SponserCR } from '../domain/SponserCR';
import { ContactCR } from '../domain/ContactCR';
import { AccountCR } from '../domain/AccountCR';

@Injectable()
export class ChangeRequestService {

  constructor() { }

  fillChangeRequestValues(form:any,changeRequest:SponsershipChangeRequest,familyMemberCr:FamilyMemberCR){
    changeRequest.topic={...form["topic"]};
    changeRequest.reason={...form["reason"]};
   
    
    if(form["topic"].id==Globals.TOPIC_STOP_SPONSERSHIP_ID&&form["reason"].id<6){
      changeRequest.topicReasonDate=form["topicReasonDate"];
    }else if(form["topic"].id==Globals.TOPIC_CHANGE_DATA_ID&&form["reason"].id==Globals.REASON_CHANGE_SPONSER_ID){
     
      familyMemberCr.sponserCR=new SponserCR();
      familyMemberCr.sponserCR.account=new AccountCR();
      familyMemberCr.sponserCR.contact=new ContactCR();

      familyMemberCr.sponserCR.cpr=form["sponserNewCpr"];
      familyMemberCr.sponserCR.personArabicName=form["sponserNewName"];
     
     let account:Account=new Account();
     account.bank=form["newBankName"];
     account.accountNo=form["newAccountNo"];
     account.iban=form["newIBAN"];
     account.cpr=form["sponserNewCpr"];
     
     familyMemberCr.sponserCR.account={...account};
     familyMemberCr.sponserCR.contact.mobilesms=form["newMobileSms"];
     familyMemberCr.sponserCR.contact.mobile=form["newMobile"];
     familyMemberCr.sponserCR.contact.homeTel=form["newHomeTel"];

      if (changeRequest.familyChangeRequest.familyMembers.length != 0) {
        changeRequest.familyChangeRequest.familyMembers[changeRequest.familyChangeRequest.familyMembers.indexOf(familyMemberCr)] = familyMemberCr;
      }else{
        changeRequest.familyChangeRequest.familyMembers.push(familyMemberCr);
      }
      
    }else if(form["topic"].id==Globals.TOPIC_CHANGE_DATA_ID&&form["reason"].id==Globals.REASON_CHANGE_ACCOUNT_DETAILS_ID){
      
      let account:Account=new Account();
      account.bank={...form["newBankName"]};
      account.accountNo=form["newAccountNo"];
      account.iban=form["newIBAN"];
      account.cpr=familyMemberCr.sponserCR.cpr;
      familyMemberCr.accountCR={...account};

      if (changeRequest.familyChangeRequest.familyMembers.length != 0) {
        changeRequest.familyChangeRequest.familyMembers[changeRequest.familyChangeRequest.familyMembers.indexOf(familyMemberCr)] = familyMemberCr;
      }else{
        changeRequest.familyChangeRequest.familyMembers.push(familyMemberCr);
      }
  
    }else if(form["topic"].id==Globals.TOPIC_CHANGE_DATA_ID&&form["reason"].id==Globals.REASON_CHANGE_CONTACT_DETAILS_ID){
       if(form["contactOwner"]==1){//nextOfKin
        familyMemberCr.nextOfKinContact=new Contact();
        familyMemberCr.nextOfKinContact.mobilesms=form["newMobileSms"];
        familyMemberCr.nextOfKinContact.mobile=form["newMobile"];
        familyMemberCr.nextOfKinContact.homeTel=form["newHomeTel"];
      }else if(form["contactOwner"]==2){//sponser
        familyMemberCr.sponserCR.contact.mobilesms=form["newMobileSms"];
        familyMemberCr.sponserCR.contact.mobile=form["newMobile"];
        familyMemberCr.sponserCR.contact.homeTel=form["newHomeTel"];
      }else if(form["contactOwner"]==3){//widow
        familyMemberCr.contact.mobilesms=form["newMobileSms"];
        familyMemberCr.contact.mobile=form["newMobile"];
        familyMemberCr.contact.homeTel=form["newHomeTel"];
      } 

      if (changeRequest.familyChangeRequest.familyMembers.length != 0) {
        changeRequest.familyChangeRequest.familyMembers[changeRequest.familyChangeRequest.familyMembers.indexOf(familyMemberCr)] = familyMemberCr;
      }else{
        changeRequest.familyChangeRequest.familyMembers.push(familyMemberCr);
      }

      changeRequest.contactOwner=form["contactOwner"];
    }
    
  }
}
