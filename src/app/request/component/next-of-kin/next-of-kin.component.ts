import { FamilyService } from './../../../service/family.service';
import { OnChanges } from '@angular/core';
import { Applicant } from './../../../domain/Applicant';
import { Person } from './../../../domain/Person';
import { NextOfKinValidationService } from './../../../service/next-of-kin-validation.service';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input } from '@angular/core';
import { NextOfKin } from '../../../domain/NextOfKin';
import { Contact } from '../../../domain/Contact';
import { Globals } from '../../../common/globals';
import { PersonService } from '../../../service/person.service';
import { Message } from 'primeng/primeng';
import { SharedService } from '../../../service/shared.service';
import { RcoMessage } from '../../../common/rco-message';

@Component({
  selector: 'next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.scss'],
  providers:[NextOfKinValidationService]
})
export class NextOfKinComponent implements OnInit ,OnChanges {

  @Input()
  family:Family;
  @Input()
  applicant:Applicant;
  @Input()
  isViewState:Boolean;

  header:string;
  nextOfKin:NextOfKin;
  selectedNextOfKin:NextOfKin;
  newNextOfKin:boolean;
  displayNextOfKinDialog:boolean;
  blockedNextOfKinPanel:boolean;
  cols:any[];
  msgs:Message[]=[];
  personType: string = "NEXT_OF_KIN";
  constructor(private globals: Globals,
    private personService: PersonService, 
    private nextOfKinValidationService: NextOfKinValidationService, 
    private sharedService: SharedService,
    private familyService:FamilyService) { }

  ngOnInit() {
    this.header=this.globals.NEXTOFKIN_HEADER;  
    this.cols = [
      
      {header: 'الرقم الشخصي' },
      { header:'الاسم'  },
      {header: 'هاتف الرسائل' },
      { header: 'هاتف نقال' },
      { header: 'هاتف المنزل' }
  ];

  this.subscribeToWidowAsNextOfKinEvent();


  }
  
  ngOnChanges(changes:any):void {
    //works in view only ,
    //to get nextofkin for that orphan -"applicant" - only
    if( changes.applicant){
      let _applicant:Applicant = changes.applicant.currentValue;
      this.viewApplicantNextOfKin(_applicant);
    }
    
     
   }

   viewApplicantNextOfKin(_applicant:Applicant){
    if (_applicant) {
      let familyMember=this.familyService.getFamilyMemberByCpr(this.family,_applicant.cpr);
      if(familyMember&&familyMember.nextOfKin!=undefined){
        this.family.nextOfKins=[familyMember.nextOfKin];
      }
         else{  
          this.family.nextOfKins=[];
         }
    }
   }
  getPersonCRS(cpr: string,autoSave?:Boolean,mother?:Person) {
    
    if(cpr!=undefined && cpr!=null && cpr !=""){
      this.blockedNextOfKinPanel=true;
      this.personService.getPerson(cpr,this.personType).subscribe(
        result => {
          this.msgs=[];
          let person=<Person>result;
         
         if( person.rejectionReasons!=undefined &&person.rejectionReasons.length==0){
          this.nextOfKin = <NextOfKin>result;
          //for saving widow to the list in case she is one of next of kins !!
          if(autoSave){
            this.newNextOfKin=true;
          }

         }else{
          this.nextOfKin=new NextOfKin();
          person.rejectionReasons.forEach(value=>{
            this.msgs.push({severity:'error', detail:value});
          })
         }

         this.nextOfKin.contact=new Contact();
          this.blockedNextOfKinPanel=false;
           //for saving widow to the list in case she is one of next of kins !!
          if(autoSave&&this.newNextOfKin){
            this.nextOfKin.contact={...mother.contact};
            this.saveNextOfKin();
          }
        },
        err => {
        //  this.nextOfKin=new NextOfKin();
         // this.nextOfKin.contact=new Contact();
          this.blockedNextOfKinPanel=false;
          this.msgs=[];
          console.log(err);
        }
      );
    }
  
  }

saveNextOfKin(autoSave?:boolean) {
   this.msgs=[];
   let nextOfKinDetailsCheck=this.nextOfKinValidationService.validateNextOfKinDetails(this.nextOfKin);
   let tempNextOfKin = this.family.nextOfKins.filter(_nextOfKin=> _nextOfKin.cpr==this.nextOfKin.cpr);

     if(nextOfKinDetailsCheck.length==0){
      let nextOfKins = [...this.family.nextOfKins];
          if (this.newNextOfKin){
            
              if(tempNextOfKin.length>0){
                this.msgs.push({severity:'error', detail:RcoMessage.PERSON_ALREADY_EXISTS});
                return;
              }

              nextOfKins.push(this.nextOfKin);
          }
          else{
         /*   if(autoSave){
              nextOfKins[ this.family.nextOfKins.indexOf(this.nextOfKin)] = this.nextOfKin;
            }else{
              nextOfKins[ this.family.nextOfKins.indexOf(this.selectedNextOfKin)] = this.nextOfKin;
            }*/
            nextOfKins[ this.family.nextOfKins.indexOf(this.selectedNextOfKin)] = this.nextOfKin;
          }
         

          this.family.nextOfKins = nextOfKins;
          this.nextOfKin = null;
          this.displayNextOfKinDialog = false;
     }else{
      
      this.msgs=[...nextOfKinDetailsCheck];
     }
      
  }

  deleteNextOfKin() {
      let index = this.family.nextOfKins.indexOf(this.selectedNextOfKin);
      this.family.nextOfKins = this.family.nextOfKins.filter((val, i) => i != index);
      this.nextOfKin = null;
      this.displayNextOfKinDialog = false;
  }


showDialogToAddNextOfKin() {
  this.newNextOfKin = true;
  this.nextOfKin = new NextOfKin();
  this.nextOfKin.contact=new Contact();
  this.displayNextOfKinDialog = true;
}
onNextOfKinSelect(event) {
  if(!this.isViewState){

  this.newNextOfKin = false;
  this.nextOfKin = this.cloneNextOfKin(event.data);
  this.displayNextOfKinDialog = true;
  }
}

cloneNextOfKin(s: NextOfKin): NextOfKin {
  let nextOfKin = new NextOfKin();
  nextOfKin.cpr=s.cpr;
  nextOfKin.personArabicName=s.personArabicName;
  nextOfKin.contact={...s.contact};

  return nextOfKin;
}

subscribeToWidowAsNextOfKinEvent():void{
  this.sharedService.widowAsNextOfKin.subscribe(event=>{

    let tempNextOfKin = this.family.nextOfKins.filter(_nextOfKin=> _nextOfKin.cpr==event.mother["cpr"]);
    
    if(event["isChecked"]){
      if(tempNextOfKin["length"]==0){
        this.getPersonCRS(event.mother["cpr"],true,event.mother);
      }else{
        if(tempNextOfKin.length>0){
          this.msgs.push({severity:'error', detail:RcoMessage.PERSON_ALREADY_EXISTS});
          return;
        }
           /* this.newNextOfKin=false;
            this.nextOfKin =tempNextOfKin[0];
            this.nextOfKin.personArabicName=event.mother["personArabicName"];
            this.nextOfKin.contact.mobile=event.mother["mobile2"];
            this.nextOfKin.contact.mobilesms=event.mother["mobile1SMS"];
            this.saveNextOfKin(true);*/
      }
     
    } else if(tempNextOfKin){
      this.family.nextOfKins=this.family.nextOfKins.filter(_nextOfKin=> _nextOfKin.cpr!=event.mother["cpr"]);
    }
    
  });
}


}
