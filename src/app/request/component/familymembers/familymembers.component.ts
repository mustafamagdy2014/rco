import { FamilyMember } from './../../../domain/FamilyMember';
import { NGXLogger } from 'ngx-logger';
import { UtilityService } from './../../../service/utility.service';
import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../../common/globals';
import { Family } from '../../../domain/Family';
import { FamilyService } from '../../../service/family.service';
import { MaritalInfo } from '../../../domain/MaritalInfo';
import { Message } from 'primeng/components/common/api';
import { PersonService } from '../../../service/person.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'familymembers',
  templateUrl: './familymembers.component.html',
  styleUrls: ['./familymembers.component.scss']
})
export class FamilymembersComponent implements OnInit {
  @Input() family: Family;

  header: string;
  cols: any[];
  maritalStatus: MaritalInfo = new MaritalInfo();
  msgs: Message[] = [];
  display = false;
  familyMemberCRS: any;
  haveChildern: boolean;

  constructor(
    private globals: Globals,
    private familyService: FamilyService,
    private personService: PersonService,
    private utility:UtilityService,
    private router:Router,
    private logger:NGXLogger
  ) { }

  ngOnInit() {
    this.cols = [
      { header: 'الرقم الشخصي' },
      { header: 'الاسم' },
      { header: 'النوع' },
      { header: 'اسم ولي الامر' },
      { header: 'اسم الكفيل' },
      { header: 'اسم البنك' },
      { header: 'رقم الحساب' },
      { header: 'القرار المبدئي' }
    ];
    console.log(this.family.familyMembers);
    this.header = this.globals.FAMILY_MEMBERS_HEADER;

  }
  showDialog(data) {
    this.familyMemberCRS = data;
    this.display = true;
    this.familyService.haveChildern(data.cpr).subscribe(
      res => {
        this.haveChildern = JSON.parse(res['_body']);
      },
      err => {
        console.log(err);
      }
    );
  }

  openViewPersonInfo(_familyMember:FamilyMember){
    if(this.family&&this.family.id){
      let familyId=this.utility.encode(this.family.id);
      let applicantCpr=this.utility.encode(_familyMember.cpr);
      let applicantFamilyRelationCode = this.utility.encode(_familyMember.familyRelationCode.id);
      let applicantFamilyId=this.utility.encode(this.family.id);
      if(familyId!=undefined&&applicantCpr!=undefined)
      {
        this.router.navigate(["view-person-info",applicantCpr,applicantFamilyRelationCode,applicantFamilyId,familyId]);
      }
      else
      {
        this.logger.debug("family id ,applicant cpr ",[familyId,applicantCpr]);
      }
    }
   
  }
}
