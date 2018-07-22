import { FamilyService } from './../../../service/family.service';
import { FamilyMember } from './../../../domain/FamilyMember';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Person } from "../../../domain/person";
import { SharedService } from "../../../service/shared.service";
import { PersonService } from "../../../service/person.service";
import { Applicant } from "../../../domain/Applicant";
import { ActivatedRoute, Router } from "@angular/router";
import { Globals } from "../../../common/globals";
import { UtilityService } from "../../../service/utility.service";

@Component({
  selector: "orphan",
  templateUrl: "./orphan.component.html",
  styleUrls: ["./orphan.component.scss"]
})
export class OrphanComponent implements OnInit ,OnChanges {
  orphan: Person = new Person();
  
  @Input() applicant:Applicant;
  @Input() family:Family;

  familyMember:FamilyMember;
  header:string;

  blockedOrphanPanel:boolean;
  isMotherOrWidow:boolean;
  personType:string="ORPHAN";
  constructor(
    private sharedService: SharedService,
    private personService: PersonService,
    private globals:Globals,
    private route:ActivatedRoute,
    private utilityService:UtilityService,
    private router:Router,
    private familyService:FamilyService
  ) {}

  ngOnInit() {
    this.header=this.globals.ORPHAN_HEADER;
      this.route.params.subscribe(params=>{
      this.getPersonData();
    });
    
  }
  ngOnChanges(changes:any):void {
    let _family:Family = changes.family.currentValue;
    if (_family.id) { // && this.isViewState&&!this.inputDateAvailable
      this.familyMember=this.familyService.getFamilyMemberByCpr(this.family,this.applicant.cpr);
       this.orphan["beneficiaryStatus"]=this.familyMember.beneficiaryStatus;
    }
   
  }
    

  getPersonData() {
    //Applicant is Orphan
    if(this.applicant){
      if (
        this.applicant.familyRelationCode == 3 ||
        this.applicant.familyRelationCode == 4
      ) {
        this.blockedOrphanPanel=true;
        this.personService.getPerson(this.applicant.cpr,this.personType).subscribe(
          result => {
            this.orphan = <Person>result;
            
            this.orphan.birthDate = new Date(this.orphan.birthDate);
            this.blockedOrphanPanel=false;
          },
          err => {
            this.blockedOrphanPanel=false;
            console.log(err);
          }
        );
      }else{
        this.isMotherOrWidow=true;
      }
    }
    
  }
  openFamilyMembersView(){
    let familyId=this.utilityService.encode(this.applicant.familyId);

    if(familyId!=undefined){
      this.router.navigate(["view-family-members-info",familyId]);
    }
  }
}
