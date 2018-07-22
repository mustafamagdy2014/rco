import { SponsershipChangeRequest } from './../../../domain/SponsershipChangeRequest';
import { Globals } from './../../../common/globals';
import { RcoMessage } from './../../../common/rco-message';
import { NGXLogger } from 'ngx-logger';
import { FamilyMember } from './../../../domain/FamilyMember';
import { Message } from 'primeng/components/common/api';
import { PersonService } from './../../../service/person.service';
import { SelectItem } from 'primeng/api';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FamilyService } from '../../../service/family.service';
import { Person } from '../../../domain/person';
import { Sponser } from '../../../domain/Sponser';
import { DynamicFormValidators } from './validators/dynamic-form.validators';
import { FamilyMemberCR } from '../../../domain/FamilyMemberCR';
import { SponserCR } from '../../../domain/SponserCR';
import { Contact } from '../../../domain/Contact';
import { AccountCR } from '../../../domain/AccountCR';
import { Account } from '../../../domain/Account';
import { ContactCR } from '../../../domain/ContactCR';
import { AppService } from '../../../service/app.service';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnChanges {

  @Input()
  rcoLookup: any;
  @Input()
  applicantCpr: any;
  @Input()
  family: Family;
  @Input()
  sponsershipChangeRequest:SponsershipChangeRequest;

  familyMemberCR:FamilyMemberCR;
  form: FormGroup;
  
  widow:FamilyMember;
  familyMember: FamilyMember;
  contactOwners: SelectItem[]=[];
  blockedSponserForm:Boolean;
  showSendBTN:boolean=true;
  msgs:Message[]=[];
  personType:string="SPONSER";
  IBANPattern:string=Globals.IBAN_PATTERN;

  constructor(private familyService: FamilyService,private personService:PersonService,private appService:AppService,private logger:NGXLogger) {
  }

  ngOnChanges(changes: any): void {
    let _family: Family = changes.family.currentValue;
    if (_family && _family.id) {
      this.familyMember = this.familyService.getFamilyMemberByCpr(this.family, this.applicantCpr);
      this.widow=this.familyService.getFamilyMemberByCode(this.family,["WIDOW","MOTHER"])[0];
      this.initContactOwners();
      this.initFamilyMemberCr();
      this.createFormModel(this.sponsershipChangeRequest.topic,this.sponsershipChangeRequest.reason);
      
    }
  }
  ngOnInit() {
  }
 
  initFamilyMemberCr(){
    this.familyMemberCR=this.familyService.getFamilyMemberCrByCpr(this.sponsershipChangeRequest.familyChangeRequest,this.applicantCpr);

    if(this.familyMemberCR==undefined||this.familyMemberCR==null){
      this.familyMemberCR=new FamilyMemberCR();
      this.familyMemberCR.cpr=this.applicantCpr;
      this.familyMemberCR.sponserCR=new SponserCR();
      this.familyMemberCR.sponserCR.contact=new ContactCR();
      this.familyMemberCR.sponserCR.account=new AccountCR();
      this.familyMemberCR.contact=new Contact();
      this.familyMemberCR.accountCR=new AccountCR();
      
    }
  }

  initContactOwners():void{
    
    this.contactOwners.push({label:this.familyMember.nextOfKin.personArabicName+"   (ولي أمر) " , value:1});
    this.contactOwners.push({label:this.familyMember.sponser.personArabicName+"   (كفيل) " , value:2});
    this.contactOwners.push({label:this.widow.personArabicName+"   (أرملة) " , value:3});
  }
  initReason(event) {console.log(event.value);
    let firstReason = event.value["reasons"][0];
    //i decided to reset form to update form valid property
    //for examble if reason was "change sponser" , and the form became not valid because mobile number is not entered ,
    //when user change the reason to "change bank account" , the form is still not valid , which is not true 
    //so i had to reset the form to its intial state to reset validators!! 
    this.form.reset(this.createFormModel(event.value,firstReason));
  }
  reasonChanged(event){console.log(this.topic);
    this.form.reset(this.createFormModel(this.topic,event.value));
  }
  showOrHideSendBTN(_reason:any):void{
    this.showSendBTN=true;
    if(_reason["id"]==Globals.REASON_CHANGE_CONTACT_DETAILS_ID||_reason["id"]==Globals.REASON_CHANGE_ACCOUNT_DETAILS_ID||this.appService.hasRole("ROLE_COMMITTEE_SECRETARY")){
      this.showSendBTN=false;
    }
  }
  showContactInfo(event){
    let mobileSms="";
    let mobile="";
    let homeTel=0;

    if(event.value==1){
      mobileSms=this.familyMember.nextOfKin.contact.mobilesms;
      mobile=this.familyMember.nextOfKin.contact.mobile;
      homeTel=this.familyMember.nextOfKin.contact.homeTel;
    }else if(event.value==2){
      mobileSms=this.familyMember.sponser.contact.mobilesms;
      mobile=this.familyMember.sponser.contact.mobile;
      homeTel=this.familyMember.sponser.contact.homeTel;
    }else if(event.value==3){
      mobileSms=this.widow.contact.mobilesms;
      mobile=this.widow.contact.mobile;
      homeTel=this.widow.contact.homeTel;
    }
    this.form.get('oldMobileSms').setValue(mobileSms);
    this.form.get('oldMobile').setValue(mobile);
    this.form.get('oldHomeTel').setValue(homeTel);
  }
  get topic() {
    return this.form.get('topic').value;
  }

  get reason() {
    return this.form.get('reason').value;
  }

  get newMobileSms() {
    return this.form.get('newMobileSms');
  }
  get newMobile() {
    return this.form.get('newMobile');
  }
  get sponserNewCpr(){
    return this.form.get('sponserNewCpr');
  }
  initSponserNewCpr(){
    if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.cpr!=undefined&&this.familyMemberCR.sponserCR.cpr!=null){
      return this.familyMemberCR.sponserCR.cpr;
    }
    return '';
  }
  initSponserNewName(){
    if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.personArabicName!=undefined&&this.familyMemberCR.sponserCR.personArabicName!=null){
      return this.familyMemberCR.sponserCR.personArabicName;
    }
    return '';
  }

  initNewAccountNo(){
    if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.account.accountNo!=undefined&&this.familyMemberCR.sponserCR.account.accountNo!=null){
      return this.familyMemberCR.sponserCR.account.accountNo;
    }
    return '';
  }

  initNewBankName(){
    if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.account.bank!=undefined&&this.familyMemberCR.sponserCR.account.bank!=null){
      return this.familyMemberCR.sponserCR.account.bank;
    }
    return this.rcoLookup["BANK"][0];
  }
  initNewIBAN(){
    if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.account.iban!=undefined&&this.familyMemberCR.sponserCR.account.iban!=null){
      return this.familyMemberCR.sponserCR.account.iban;
    }
    return '';
  }
  initContactOwner(){
    if(this.sponsershipChangeRequest!=undefined&&this.sponsershipChangeRequest!=null&&this.sponsershipChangeRequest.contactOwner!=undefined&&this.sponsershipChangeRequest.contactOwner!=null){
      return this.sponsershipChangeRequest.contactOwner;
    }
    return this.contactOwners[0].value;
  }
  initTopicReasonDate(){
    if(this.sponsershipChangeRequest!=undefined&&this.sponsershipChangeRequest!=null&&this.sponsershipChangeRequest.topicReasonDate!=undefined&&this.sponsershipChangeRequest.topicReasonDate!=null){
      return new Date(this.sponsershipChangeRequest.topicReasonDate);
    }
    return '';
  }
   initNewMobile(_contactOwner:number){
     let mobile='';
    if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.contact.mobile!=undefined&&this.familyMemberCR.sponserCR.contact.mobile!=null){
      if(_contactOwner==Globals.CONTACT_OWNER_NEXT_OF_KIN)
          mobile= this.familyMemberCR.nextOfKinContact.mobile;
        else if(_contactOwner==Globals.CONTACT_OWNER_SPONSOR)
          mobile= this.familyMemberCR.sponserCR.contact.mobile;
        else if(_contactOwner==Globals.CONTACT_OWNER_WIDOW)
          mobile= this.widow.contact.mobile; 

          return mobile;
    }
    return mobile;
  } 
  initNewMobileSms(_contactOwner:number){
    let mobilesms='';
   if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.contact.mobile!=undefined&&this.familyMemberCR.sponserCR.contact.mobile!=null){
     if(_contactOwner==Globals.CONTACT_OWNER_NEXT_OF_KIN)
       mobilesms= this.familyMemberCR.nextOfKinContact.mobilesms;
       else if(_contactOwner==Globals.CONTACT_OWNER_SPONSOR)
       mobilesms= this.familyMemberCR.sponserCR.contact.mobilesms;
       else if(_contactOwner==Globals.CONTACT_OWNER_WIDOW)
       mobilesms= this.widow.contact.mobilesms; 

         return mobilesms;
   }
   return mobilesms;
 }

 initNewHomeTel(_contactOwner:number){
  let newHomeTel='';
 if(this.familyMemberCR!=undefined&&this.familyMemberCR!=null&&this.familyMemberCR.sponserCR.contact.mobile!=undefined&&this.familyMemberCR.sponserCR.contact.mobile!=null){
   if(_contactOwner==Globals.CONTACT_OWNER_NEXT_OF_KIN)
   newHomeTel= this.familyMemberCR.nextOfKinContact.homeTel;
     else if(_contactOwner==Globals.CONTACT_OWNER_SPONSOR)
     newHomeTel= this.familyMemberCR.sponserCR.contact.homeTel;
     else if(_contactOwner==Globals.CONTACT_OWNER_WIDOW)
     newHomeTel= this.widow.contact.homeTel; 

       return newHomeTel;
 }
 return newHomeTel;
}

 
  get newIBAN(){
    return this.form.get('newIBAN');
  }
  get topicReasonDate(){
    return this.form.get('topicReasonDate');
  }

  createFormModel(_topic , _reason) {
    this.showOrHideSendBTN(_reason);
    if (this.rcoLookup) {
      try {
        this.form = new FormGroup({
          topic: new FormControl(_topic),
          reason: new FormControl(_reason),
          contactOwner:new FormControl(this.initContactOwner()),
          topicReasonDate: new FormControl(this.initTopicReasonDate(),DynamicFormValidators.cannotBeEmptyWhenMWD),
  
          sponserOldName: new FormControl({ value: this.familyMember.sponser.personArabicName, disabled: true }),
          oldBankName: new FormControl({ value: this.familyMember.account.bank.nameAr, disabled: true }),
          oldAccountNo: new FormControl({ value: this.familyMember.account.accountNo, disabled: true }),
          oldIBAN: new FormControl({ value: this.familyMember.account.iban, disabled: true }),
          newBankName: new FormControl(this.initNewBankName()),
          newAccountNo: new FormControl(this.initNewAccountNo()),
          newIBAN: new FormControl(this.initNewIBAN(),Validators.pattern(this.IBANPattern)),
          oldMobileSms: new FormControl({ value: this.familyMember.nextOfKin.contact.mobilesms, disabled: true }),
          oldMobile: new FormControl({ value: this.familyMember.nextOfKin.contact.mobile, disabled: true }),
          oldHomeTel: new FormControl({ value: this.familyMember.nextOfKin.contact.homeTel, disabled: true }),
          newMobileSms: new FormControl(this.initNewMobileSms(this.sponsershipChangeRequest.contactOwner),[Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$"),DynamicFormValidators.cannotBeEmptyWhenSponserOrContact]),
          newMobile: new FormControl(this.initNewMobile(this.sponsershipChangeRequest.contactOwner),[Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$"),DynamicFormValidators.cannotBeEmptyWhenSponserOrContact]),
          newHomeTel: new FormControl(this.initNewHomeTel(this.sponsershipChangeRequest.contactOwner),Validators.pattern("^[0-9]*$")),
          sponserOldCpr: new FormControl({ value: this.familyMember.sponser.cpr, disabled: true }),
          sponserNewCpr: new FormControl(this.initSponserNewCpr(),[Validators.minLength(9),Validators.maxLength(9),Validators.pattern("^[0-9]*$"),DynamicFormValidators.cannotBeEmptyWhenSponser,DynamicFormValidators.cannotBeSameSponser]),
          sponserNewName: new FormControl({ value: this.initSponserNewName(), disabled: true }),
  
        });
      } catch (error) {
        this.logger.error(error);
      }

     return this.form;
    }
  }
  getPersonCRS(cpr:string):void {
    if(cpr.length==9&&this.sponserNewCpr.valid){
      this.blockedSponserForm=true;
   
      this.personService.getPerson(this.sponserNewCpr.value,this.personType).subscribe(
        result => {
          this.msgs=[];
          let person=<Person>result
           
          if( person.rejectionReasons!=undefined &&person.rejectionReasons.length==0){
           this.form.controls["sponserNewName"].setValue(result["personArabicName"]);
         
          }else{
           person.rejectionReasons.forEach(value=>{
             this.msgs.push({severity:'error', detail:value});
           })
           this.sponserNewCpr.reset('');
           this.form.controls["sponserNewName"].reset('');
          }
  
          this.blockedSponserForm=false;
        },
        err => {
          this.blockedSponserForm=false;
          this.msgs=[];
          console.log(err);
        }
      );
    }
   
  }
}
