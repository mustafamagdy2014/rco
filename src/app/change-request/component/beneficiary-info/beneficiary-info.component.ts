import { FamilyMember } from './../../../domain/FamilyMember';
import { FamilyService } from './../../../service/family.service';
import { Family } from './../../../domain/Family';
import { Component, OnInit, Input } from "@angular/core";
import { Person } from "../../../domain/person";
import { SharedService } from "../../../service/shared.service";
import { PersonService } from "../../../service/person.service";
import { Applicant } from "../../../domain/Applicant";
import { ActivatedRoute, Router } from "@angular/router";
import { Globals } from "../../../common/globals";
import { UtilityService } from "../../../service/utility.service";

@Component({
  selector: 'beneficiary-info',
  templateUrl: './beneficiary-info.component.html',
  styleUrls: ['./beneficiary-info.component.css']
})
export class BeneficiaryInfoComponent implements OnInit {
  
  @Input() applicantCpr: any;
  @Input() family: Family;
  
  familyMember:FamilyMember;
  beneficiary: Person = new Person();
  header:string;

  blockedOrphanPanel:boolean;
  personType:string="COMMON";
  constructor(
    private sharedService: SharedService,
    private personService: PersonService,
    private globals:Globals,
    private route:ActivatedRoute,
    private utilityService:UtilityService,
    private familyService:FamilyService,
    private router:Router
  ) {}

  ngOnInit() {
    this.header=this.globals.ORPHAN_HEADER;
    this.familyMember=this.familyService.getFamilyMemberByCpr(this.family,this.applicantCpr);

      this.route.params.subscribe(params=>{
      this.getPersonData();
    });
    
  }

  getPersonData() {
    if(this.applicantCpr)
    {

      this.blockedOrphanPanel = true;
      this.personService.getPerson(this.applicantCpr, this.personType).subscribe(
        result => 
        {
          this.beneficiary = <Person>result;
          this.beneficiary.birthDate = new Date(this.beneficiary.birthDate);
          this.blockedOrphanPanel = false;
        },
        err => 
        {
          this.blockedOrphanPanel = false;
          console.log(err);
        }
      );
      }
    }
  openFamilyMembersView(){
    let familyId=this.utilityService.encode(this.family.id);

    if(familyId!=undefined)
    {
      this.router.navigate(["view-family-members-info",familyId]);
    }
  }
}
