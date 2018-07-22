import { Globals } from './../../../common/globals';
import { SponserService } from './../../../service/sponser.service';
import { AccountService } from './../../../service/account.service';
import { OnChanges } from '@angular/core';
import { Person } from './../../../domain/person';
import { Message } from 'primeng/primeng';
import { SponserValidationService } from './../../../service/sponser-validation.service';
import { PersonService } from './../../../service/person.service';
import { Contact } from './../../../domain/Contact';
import { Sponser } from './../../../domain/Sponser';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Account } from '../../../domain/Account';
import { AccountValidationService } from '../../../service/account-validation.service';
import { FamilyService } from '../../../service/family.service';
import { Applicant } from '../../../domain/Applicant';
import { NGXLogger } from 'ngx-logger';
import { RcoMessage } from '../../../common/rco-message';


@Component({
  selector: 'sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss'],
  providers:[SponserService,SponserValidationService,AccountValidationService,AccountService]
})
export class SponsorComponent implements OnInit ,OnChanges {

  @Input()
  rcoLookup:any;
  @Input()
  family:Family;
  @Input()
  applicant:Applicant;
  @Input()
  isViewState:Boolean;

  header:string;

  displaySponserDialog: boolean;
  displayAccountDialog:boolean;
  newSponser: boolean;
  newAccount: boolean;
  sponser:Sponser;
  account:Account;
  modifiedAccountSponser:Sponser;
  selectedSponser:Sponser;
  selectedAccount:Account;
  cols: any[];
  IBANPattern:string=Globals.IBAN_PATTERN;
  blockedSponserPanel:boolean=false;
  msgs:Message[]=[];
  personType:string="SPONSER";
  constructor(private globals:Globals,private personService:PersonService,private sponserService:SponserService,private sponserValidationService:SponserValidationService,private accountValidationService:AccountValidationService,private familyService:FamilyService,private accountService:AccountService,private logger:NGXLogger) {
      this.sponser=new Sponser();
      this.sponser.contact=new Contact();
   }

  ngOnInit() {
    this.header=this.globals.SPONSER_HEADER;  
    this.cols = [
      
        {header: 'الرقم الشخصي' },
        { header:'الاسم'  },
        {header: 'هاتف الرسائل' },
        { header: 'هاتف نقال' },
        { header: 'هاتف المنزل' },
        {header:"المزيد"}
    ]
    }



    ngOnChanges(changes:any):void {
      //works in view only ,
      //to get nextofkin for that orphan -"applicant" - only
      if( changes.applicant){
        let _applicant:Applicant = changes.applicant.currentValue;
        this.viewApplicantSponser(_applicant);
      }
      
       
     }
  
     viewApplicantSponser(_applicant:Applicant){
      if (_applicant) {
        let familyMember=this.familyService.getFamilyMemberByCpr(this.family,_applicant.cpr);
        if(familyMember&&familyMember.sponser!=undefined){
          this.family.sponsers=[familyMember.sponser];
        }
           else{  
            this.family.sponsers=[];
           }
      }
     }
  
  getPersonCRS(cpr: string):void {
    this.blockedSponserPanel=true;
   
    this.personService.getPerson(cpr,this.personType).subscribe(
      result => {
        this.msgs=[];
        let person=<Person>result
         
        if( person.rejectionReasons!=undefined &&person.rejectionReasons.length==0){
         this.sponser = <Sponser>result;
       
        }else{
          this.sponser=new Sponser();
         person.rejectionReasons.forEach(value=>{
           this.msgs.push({severity:'error', detail:value});
         })
        }

        this.sponser.contact=new Contact();
        this.sponser.accounts=[];

        this.blockedSponserPanel=false;
      },
      err => {
        this.blockedSponserPanel=false;
        this.msgs=[];
        console.log(err);
      }
    );
  }
 



saveSponser() {
    let sponserDetailsCheck=this.sponserValidationService.validateSponserDetails(this.sponser);
    let tempSponsers = this.family.sponsers.filter(_sponser=> _sponser.cpr==this.sponser.cpr);

      if(sponserDetailsCheck.length==0){
        this.sponserService.mergeSponser(this.sponser).subscribe(responseSponser=>{
          this.sponser={...responseSponser};
          this.sponser.accounts=[...responseSponser.accounts];

          let sponsers = [...this.family.sponsers];
          if (this.newSponser){
            if(tempSponsers.length>0){
              this.msgs.push({severity:'error', detail:RcoMessage.PERSON_ALREADY_EXISTS});
              return;
            }
            sponsers.push(this.sponser);
          }
          else
          sponsers[ this.family.sponsers.indexOf(this.selectedSponser)] = this.sponser;

          this.family.sponsers = sponsers;
          this.sponser = null;
          this.displaySponserDialog = false;

        },
      error=>{
        this.logger.error(error);
      });
      
      }else{
        this.msgs=[];
        this.msgs=[...sponserDetailsCheck];
      }
        
    }

deleteSponser() {
        let index = this.family.sponsers.indexOf(this.selectedSponser);
        this.family.sponsers = this.family.sponsers.filter((val, i) => i != index);
        this.sponser = null;
        this.displaySponserDialog = false;
    }


showDialogToAddSponser() {
    this.newSponser = true;
    this.sponser = new Sponser();
    this.sponser.contact=new Contact();
    this.displaySponserDialog = true;
}
onSponserSelect(event) {
  if(!this.isViewState){
    this.newSponser = false;
    this.sponser = this.cloneSponser(event.data);
    this.displaySponserDialog = true;
  }
  
}

cloneSponser(s: Sponser): Sponser {
    let sponser = new Sponser();
    sponser={...s};
    sponser.contact={...s.contact};
    sponser.accounts=[...s.accounts];

    return sponser;
}


showDialogToAddAccount(sponser:Sponser) {
  this.newAccount = true;
  this.account = new Account();
  this.account.bank=this.rcoLookup["BANK"][0];
  this.modifiedAccountSponser=sponser;
  this.displayAccountDialog = true;
}

onAccountSelect(sponser:Sponser,event) {
  if(!this.isViewState){
    this.newAccount = false;
    this.modifiedAccountSponser=sponser;
    this.account = this.cloneAccount(event.data);
    this.displayAccountDialog = true;
  }
}
cloneAccount(a: Account): Account {
  let account = new Account();
  account={...a};
  account.bank={...a.bank};

  return account;
}

saveAccount() {
  let accountDetailsCheck=this.accountValidationService.validateAccountDetails(this.account);
 
    if(accountDetailsCheck.length==0){
      let accounts = [...this.modifiedAccountSponser.accounts];
      this.accountService.addOrUpdateAccount(this.modifiedAccountSponser,this.account).subscribe(responseAccount=>{
        
        this.account={...responseAccount};
        if (this.newAccount)
        accounts.push(this.account);
        else
        accounts[ this.modifiedAccountSponser.accounts.indexOf(this.selectedAccount)] = this.account;

        this.modifiedAccountSponser.accounts = accounts;
        this.account = null;
        this.modifiedAccountSponser=null;
        this.displayAccountDialog = false;
      },
    error=>this.logger.error(error));

       
    }else{
      this.msgs=[];
      this.msgs=[...accountDetailsCheck];
    }
     
  }

  deleteAccount() {
    let index = this.modifiedAccountSponser.accounts.indexOf(this.selectedAccount);
    this.modifiedAccountSponser.accounts = this.modifiedAccountSponser.accounts.filter((val, i) => i != index);
    this.account = null;
    this.displayAccountDialog = false;
}



}
