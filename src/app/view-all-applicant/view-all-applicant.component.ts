import { Globals } from './../common/globals';
import { BreadcrumbService } from './../breadcrumb.service';
import { Applicant } from './../domain/Applicant';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FamilyService } from "./../service/family.service";
import { NGXLogger } from "ngx-logger";
import { UtilityService } from "../service/utility.service";
import { CarService } from '../demo/service/carservice';
import { Resource } from '../common/resource';

@Component({
  selector: "applicants",
  templateUrl: "./view-all-applicant.component.html",
  styleUrls: ["./view-all-applicant.component.scss"]
})
export class ViewAllApplicantComponent implements OnInit {
  ApplicantList: Applicant[];
  isLoggedIn:boolean;
  constructor(
    public  globals: Globals,
    private familyService: FamilyService,
    private router: Router,
    private utility:UtilityService,
    private breadcrumbService:BreadcrumbService,
    private logger:NGXLogger,
  ) {}



  viewApplicant(applicant: Applicant) {
       let familyId=this.utility.encode(applicant.familyId);
    let applicantCpr=this.utility.encode(applicant.cpr);
    let applicantFamilyRelationCode = this.utility.encode(applicant.familyRelationCode);
    let applicantFamilyId=this.utility.encode(applicant.familyId);

    if(familyId!=undefined&&applicantCpr!=undefined){
      this.router.navigate(["view-person-info",applicantCpr,applicantFamilyRelationCode,applicantFamilyId,familyId]);
    }else{
      this.logger.debug("family id ,applicant cpr ",[familyId,applicantCpr]);
    }
   
  
  }

  changeRequest(applicant: Applicant) 
  {
    let familyId=this.utility.encode(applicant.familyId);
    let applicantCpr=this.utility.encode(applicant.cpr);
    let applicantFamilyRelationCode = this.utility.encode(applicant.familyRelationCode);
    let applicantFamilyId=this.utility.encode(applicant.familyId);
    if(familyId!=undefined&&applicantCpr!=undefined)
    {
      this.router.navigate(["monthlySponsershipChangeRequest",applicantCpr,applicantFamilyRelationCode,applicantFamilyId,familyId]);
    }
    else
    {
      this.logger.debug("family id ,applicant cpr ",[familyId,applicantCpr]);
    }
  }

  getApplicants() {
    this.familyService.getApplicants().subscribe(
      result => {
        this.ApplicantList = <Applicant[]>result;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
   
    this.getApplicants();
    this.breadcrumbService.setItems([{label:Globals.BREADCRUMB_INDIVIDUALS_LIST}]);

  }
}
