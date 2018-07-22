import { Globals } from './../../../common/globals';
import { AppService } from './../../../service/app.service';
import { OnChanges } from '@angular/core';
import { UtilityService } from './../../../service/utility.service';
import { BreadcrumbService } from './../../../breadcrumb.service';
import { SponsorshipTaskWrapper } from './../../../domain/SponsorshipTaskWrapper';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit,OnChanges {

  @Input()
  sponsorshipTaskWrapper:SponsorshipTaskWrapper[];

  cols:any[];
  loading: boolean;

  constructor(private breadcrumbService:BreadcrumbService,private router:Router,private utility:UtilityService,private logger:NGXLogger,private appService:AppService) { 
    this.breadcrumbService.setItems([
      {label: Globals.BREADCRUMB_TASK_LIST}
  ]);

  this.cols = [
    { field: 'taskId', header: 'رقم المهمة' },
    { field: 'familyId', header: 'رقم الاسرة' },
    { field: 'fatherCpr', header: 'الرقم الشخصي' },
    { field: 'personArabicName', header: 'الاسم' },
    { field: 'serviceType', header: 'نوع الخدمة' },
    { field: 'requestType', header: 'نوع الطلب' },
    { field: 'requestCreationDate', header: 'تاريخ الطلب' },
    { field: 'requestStatus', header: 'حالة الطلب' },
    { field: 'stage', header: 'مرحلة الطلب' }    
];
this.loading=true;
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes:any):void {
    let _sponsorshipTaskWrapper:SponsorshipTaskWrapper[] = changes.sponsorshipTaskWrapper.currentValue;
    if (_sponsorshipTaskWrapper) {
      for (let i = 0; i < this.sponsorshipTaskWrapper.length; i++) {
        this.sponsorshipTaskWrapper[i].requestCreationDate=this.utility.transformDate(this.sponsorshipTaskWrapper[i].requestCreationDate);
      }
        this.loading=false;
    }
  }
  openTaskDetails(sponsorshipTaskWrapper:SponsorshipTaskWrapper):void{
    let requestId = this.utility.encode(sponsorshipTaskWrapper.requestId);
    let taskId=this.utility.encode(sponsorshipTaskWrapper.taskId);
    let stageName=this.utility.encode(sponsorshipTaskWrapper.name);
    let familyId=this.utility.encode(sponsorshipTaskWrapper.familyId);
    let beneficiaryCpr=this.utility.encode(sponsorshipTaskWrapper.beneficiaryCpr);

    if(requestId!=undefined&&taskId!=undefined){
      if(sponsorshipTaskWrapper.requestTypeId==Globals.REQUEST_TYPE_SPONSORSHIP_REQUEST_ID){
        this.router.navigate(["updateMonthlySponsershipRequest",requestId,taskId,stageName]);
      }else if(sponsorshipTaskWrapper.requestTypeId==Globals.REQUEST_TYPE_SPONSORSHIP_CHANGE_REQUEST_ID){
        this.router.navigate(["updateMonthlySponsershipChangeRequest",beneficiaryCpr,familyId,taskId,stageName]);
      }
      
    }else{
      this.logger.debug("request id ,task cpr ",[requestId,taskId]);
    }
  }
}
