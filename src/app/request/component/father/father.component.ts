import { UtilityService } from './../../../service/utility.service';
import { Message } from 'primeng/primeng';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { SharedService } from "../../../service/shared.service";
import { Person } from "../../../domain/person";
import { PersonService } from "../../../service/person.service";
import { Globals } from '../../../common/globals';
import { DatePipe } from '@angular/common';

@Component({
  selector: "father",
  templateUrl: "./father.component.html",
  styleUrls: ["./father.component.scss"]
})
export class FatherComponent implements OnInit ,OnChanges{
  
  @Input()
  family:Family;
  @Input()
  isViewState:boolean;
  @Input()
  isUpdateState:boolean;

  @Output()
  personRetrievedEvent=new EventEmitter<Person>();

  header:string;
  blockedFatherPanel:boolean;
 

  fatherCPR: string;
  father: Person = new Person();
  inputDateAvailable:boolean=false;
  personType:string="FATHER";

  constructor(
    private sharedService: SharedService,
    private globals:Globals,
    private personService: PersonService,
    private utilityService:UtilityService
  ) {}

  ngOnInit() {
    this.header=this.globals.FATHER_HEADER;
  }
  ngOnChanges(changes:any):void {
    let _family:Family = changes.family.currentValue;
    if (_family.id &&!this.inputDateAvailable) { //&& this.isViewState&&!this.inputDateAvailable
        this.getPersonData();
        this.getPersonCRS(this.fatherCPR);
        this.inputDateAvailable=true;
    }
  }

 

  getPersonData() {
    if (this.family.familyMembers) {
      this.family.familyMembers.forEach(member => {
        if (member.familyRelationCode.code == "FATHER") {
          this.fatherCPR = member.cpr;
        }
      });
    }
  }
  getPersonCRS(cpr: any) {
    
    if(cpr!=undefined && cpr!=null && cpr !=""){
      this.blockedFatherPanel=true;
      this.personService.getPerson(cpr,this.personType).subscribe(
        result => {
          let person=<Person>result;
         
         if( person.rejectionReasons!=undefined &&person.rejectionReasons.length==0){
          this.father = <Person>result;
          this.father.dateOfDeath=this.utilityService.transformDate(this.father.dateOfDeath);
          this.personRetrievedEvent.emit(this.father);
         }else{
          person.rejectionReasons.forEach(value=>{
            this.sharedService.globalMessageEvent.emit({message:value,type:"error"});
          })
         }
         
          this.blockedFatherPanel=false;
        },
        err => {
          this.blockedFatherPanel=false;
          console.log(err);
        }
      );
    }
  
  }
}
