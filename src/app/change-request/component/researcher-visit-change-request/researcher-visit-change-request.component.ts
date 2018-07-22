import { ResearcherVisitChangeRequestAttachment } from './../../../domain/ResearcherVisitChangeRequestAttachment';
import { ResearcherVisitChangeRequestAttachmentService } from './../../../service/researcher-visit-change-request-attachment.service';
import { ResearcherVisitChangeRequestService } from './../../../researcher-visit-change-request.service';
import { NextOfKin } from './../../../domain/NextOfKin';
import { VisitStatus } from './../../../domain/VisitStatus';
import { PersonAddress } from './../../../domain/PersonAddress';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Resource } from './../../../common/resource';
import { Response, RequestOptions, ResponseContentType, Request, RequestMethod } from '@angular/http';
import { Attachment } from './../../../domain/Attachment';
import { Globals } from './../../../common/globals';
import { element } from 'protractor';
import { Input, AfterViewInit, ViewChild } from '@angular/core';
import { Income} from './../../../domain/Income';
import { Car } from './../../../domain/car';
import { Family } from '../../../domain/Family';
import { Lookup } from '../../../domain/lookup';
import { Message, FileUpload, OverlayPanel, ConfirmationService } from 'primeng/primeng';
import { RcoMessage } from '../../../common/rco-message';
import { AppService } from '../../../service/app.service';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { UtilityService } from '../../../service/utility.service';
import { ResearcherVisitCR } from '../../../domain/ResearcherVisitCR';
import { SponsershipChangeRequest } from '../../../domain/SponsershipChangeRequest';

@Component({
  selector: 'researcher-visit-change-request',
  templateUrl: './researcher-visit-change-request.component.html',
  styleUrls: ['./researcher-visit-change-request.component.css'],
  providers:[ResearcherVisitChangeRequestService, ResearcherVisitChangeRequestAttachmentService]
})
export class ResearcherVisitChangeRequestComponent implements OnInit {

  @Input()
  sponsershipChangeRequest:SponsershipChangeRequest;
  family:Family;
  @Input()
  rcoLookup:Lookup;
  @Input()
  isViewState:boolean;
  @ViewChild('visitAddressPanel')
  visitAddressPanel:OverlayPanel;
  displayQ: boolean;
  visitId: string;
  @Input() msgs: Message[] = [];

  researcherVisit:ResearcherVisitCR = new ResearcherVisitCR();
  selectedResearcherVisit:ResearcherVisitCR = new ResearcherVisitCR();
  researcherVisitsList:ResearcherVisitCR[];
  

  displayScheduleVisitDialog = false;
  displayNextOfKins = false;
  displaySelectedNextOfKinAddress = false;
  displaySelectedNextOfKinContactInfo = false;
  displayVisitAttachmentsDialog = false;
  displayAddAttachmentDialog = false;
  displayEditScheduleVisitDialog = false;
  uploadURL:string;

  cols: any[];
  header:string;
  header2:string=this.globals.VISIT_DETAILS_HEADER;
  attachmentsCols: any[];
  addVisitCols: any[];
  incomeMessages: Message[] = [];
  dateFormat:string = Globals.DATE_FMT;
  minDate:Date = new Date();

  plannedVisitDate: Date;
  plannedVisitStartTime: Date;
  plannedVisitEndTime: Date;
  //the following variables are for the new visit dialog
  visitDate = this.minDate;
  visitStartTime = this.minDate;
  visitEndTime = this.minDate;
  //the following variables are for the update visit schedule dialog
  visitDateUpdate = this.minDate;
  visitStartTimeUpdate = this.minDate;
  visitEndTimeUpdate = this.minDate;

  selectedNextOfKinAddress:PersonAddress;
  confirmMsgs: Message[] = [];

  constructor(private globals:Globals, private appService:AppService, private researcherVisitService:ResearcherVisitChangeRequestService, private researcherVisitAttachmentService:ResearcherVisitChangeRequestAttachmentService, private confirmationService:ConfirmationService,private utilityService:UtilityService ) {
  }

  ngOnChanges(changes: any): void {
    let _sponsershipChangeRequest: SponsershipChangeRequest = changes.sponsershipChangeRequest.currentValue;
    if (_sponsershipChangeRequest ) 
    {
      if(_sponsershipChangeRequest.id)
      {
        this.family = _sponsershipChangeRequest.family;
      }
      else
      {
        this.family = new Family();
      }
    }
  }

  ngOnInit() 
  {
    this.researcherVisit.visitStatus=this.rcoLookup["VISIT_STATUS_CREATE"][0];
    this.researcherVisit.nextOfKin=this.family.nextOfKins[0];
    this.selectedResearcherVisit = {...this.researcherVisit};

    this.getSelectedNextOfKinAddress(this.family.nextOfKins[0].cpr);
    this.researcherVisitService.getResearcherVisitsByFamilyId(this.family.id).subscribe(result=>{this.researcherVisitsList = <ResearcherVisitCR[]> result;});
    this.cols = 
    [
      { header: 'التسلسل' },
      { header: 'الرقم الشخصي لولي الأمر' },
      { header: 'عرض العنوان' },
      { header: 'تاريخ الزيارة' },
      { header: 'وقت الزيارة' },
      { header: 'تعديل' },
      { header: 'معلومات الزيارة' },
      { header: 'المرفقات' },
      { header: 'الحالة' },
      { header: 'حذف' },
    ];

    this.addVisitCols = 
    [
      { header: 'التسلسل' },
      { header: 'الرقم الشخصي لولي الأمر' },
      { header: 'عرض العنوان' },
      { header: 'تاريخ الزيارة' },
      { header: 'وقت الزيارة' },
      { header: 'الحالة' },
    ];

    this.header = this.globals.ATTACHMENT_HEADER;
    this.attachmentsCols = [
      { header: 'اسم الملف' },
      { header: 'حجم الملف' },
      { header: 'حذف' }
    ];
  }

  showVisitAddress(researcherVisitIndex:number, event)
  {
    this.selectedResearcherVisit = this.researcherVisitsList[researcherVisitIndex];
    this.visitAddressPanel.toggle(event);
  }

  getSelectedNextOfKinAddress(cpr:number)
  {
    return this.researcherVisitService.getNextOfKinAddress(cpr).subscribe(
      result=>{this.selectedNextOfKinAddress=<PersonAddress> result;}
    )
  }

  nextOfKinChanged(event)
  {
    this.researcherVisit.nextOfKin=event.value;
    this.getSelectedNextOfKinAddress(this.researcherVisit.nextOfKin.cpr);
  }

  addResearcherVisit()
  { 
    //format visitDate
    let visitDateFormattedString = this.formatDate(this.visitDate);

    //format visitStartTime
    let visitStartTimeFormattedString = this.formatTime(this.visitStartTime);

    //format visitEndTime
    let visitEndTimeFormattedString = this.formatTime(this.visitEndTime);
    
    return this.researcherVisitService.addResearcherVisit(this.family.id, this.researcherVisit.nextOfKin.cpr, visitDateFormattedString, visitStartTimeFormattedString, visitEndTimeFormattedString).subscribe
    (result=>
      {
        //load visits list
        this.researcherVisitsList = <ResearcherVisitCR[]> result;
      }
    );
  }

  formatDate(date:Date)
  {
    let day:string, month:string, year:number;
    let dateFormattedString = "-1";

    day = ("0" + date.getDate());
    if(day.length===3)
    {
      day = day.substr(1);
    }
    month = ("0" + (date.getMonth() + 1)); // add 1 because months are indexed from 0
    if(month.length===3)
    {
      month = month.substr(1);
    }
    year = this.visitDate.getFullYear();
    dateFormattedString = year +"-"+month+"-"+day;
    return dateFormattedString;
  }

  formatTime(time:Date)
  {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let am = hours >= 12 ? 'pm' : 'am'; hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    let timeFormattedString = hours + ':' + minutes + ' ' + am;
    return timeFormattedString;
  }

  showDialog(data) 
  {
    this.visitId = data.id;
    this.plannedVisitDate = new Date(data.startDate);
    this.plannedVisitStartTime = new Date(data.startDate);
    this.plannedVisitEndTime = new Date(data.endDate)
    this.displayQ = true;
  }

  visitStatusChanged(event)
  {
    let selectedVisitStatus = event.value;
    if(selectedVisitStatus.id === 2)
    {
      this.displayScheduleVisitDialog = true;
    }
    else
    {
      this.displayScheduleVisitDialog = false;
    } 
  }

  addNewVisitDialogClosed()
  {
    this.displayScheduleVisitDialog = false;
    this.researcherVisit.visitStatus=this.rcoLookup["VISIT_STATUS_CREATE"][0];
  }

  showVisitAttachments(researcherVisitIndex:number)
  {
    this.selectedResearcherVisit = this.researcherVisitsList[researcherVisitIndex];
    let visitId = this.selectedResearcherVisit.id; 
    this.researcherVisitAttachmentService.getResearcherVisitAttachmentsList(visitId).subscribe
    (
      result=>
      {
        this.selectedResearcherVisit.attachments=<ResearcherVisitChangeRequestAttachment[]>result;
        this.displayVisitAttachmentsDialog=true;
        //construct fileUploadURL to contain selected visitId
        this.uploadURL = Resource.UPLOAD_CR_RESEARCHER_VISIT_ATTACHMENT_URL+"/"+this.selectedResearcherVisit.id;
      }
    )
  }

  refreshVisitAttachments(visitId:number)
  {
    this.researcherVisitAttachmentService.getResearcherVisitAttachmentsList(visitId).subscribe
    (
      result=>
      {
        this.selectedResearcherVisit.attachments=<ResearcherVisitChangeRequestAttachment[]>result;     
        this.displayVisitAttachmentsDialog=true;
        //construct fileUploadURL to contain selected visitId
        this.uploadURL = Resource.UPLOAD_CR_RESEARCHER_VISIT_ATTACHMENT_URL+"/"+this.selectedResearcherVisit.id;
      }
    )
  }

  download(file) 
  {
    this.researcherVisitAttachmentService.downloadFile(file.id).subscribe(
      data => saveAs(data, file.fileName)
    );
  }

  deleteAttachment(attachment:any) 
  {
    debugger
    this.confirmationService.confirm(
    {
      message: "هل انت متأكد من الحذف؟",
      header: "تأكيد",
      icon: "fa fa-question-circle",

      accept: () => {
        this.researcherVisitAttachmentService.deleteResearcherVisitAttachment(attachment.id).subscribe(
          res => {
            const index = this.selectedResearcherVisit.attachments.indexOf(attachment);
            this.selectedResearcherVisit.attachments = this.selectedResearcherVisit.attachments.filter((val, i) => i !== index);
            this.confirmMsgs = [
              {
                severity: 'success',
                summary: '  تأكيد  ',
                detail: ' تم الحذف بنجاح'
              }
            ];
          },
          err => { }
        );
      }
    });
  }

  showAddAttachmentDialog() 
  {
    this.displayAddAttachmentDialog = true;
  }

  updateUploadRequest(event)
  {
    event.xhr.setRequestHeader("Authorization", `Bearer ${this.appService.getAccessToken()}`);
  }

  handleVisitAttachmentUpload(event) 
  {    
    this.displayAddAttachmentDialog = false;
    this.refreshVisitAttachments(this.selectedResearcherVisit.id);
  }

  editVisitStatus(data)
  {
    if(data.newVisitStatus.id===5)//researcher visited the family, show dialog to enter visit details
    {
      this.showDialog(data);
      //document.getElementById('visitDetailsButton').click();
    }
  }

  showEditScheduleDialog(researcherVisit)
  {
    this.displayEditScheduleVisitDialog = true;
    this.selectedResearcherVisit = researcherVisit;
    //initialize nextOfKinsList
    this.selectedResearcherVisit.nextOfKinsList=new Array<NextOfKin>();
    this.selectedResearcherVisit.nextOfKinsList[0]=researcherVisit.nextOfKin;
  }

  updateVisitDate()
  {
    //format visitDateUpdate
    let visitDateFormattedString = this.formatDate(this.visitDateUpdate);
    //format visitStartTimeUpdate
    let visitStartTimeFormattedString = this.formatTime(this.visitStartTimeUpdate);
    //format visitEndTimeUpdate
    let visitEndTimeFormattedString = this.formatTime(this.visitEndTimeUpdate);

    return this.researcherVisitService.updateResearcherVisitSchedule(this.selectedResearcherVisit.familyId, -1, visitDateFormattedString, visitStartTimeFormattedString, visitEndTimeFormattedString, this.selectedResearcherVisit.id).subscribe
    (result=>
      {
        //load visits list
        this.researcherVisitsList = <ResearcherVisitCR[]> result;
        this.displayEditScheduleVisitDialog = false;
        this.msgs.push({ severity: 'success', summary: '', detail: 'تم تعديل موعد الزيارة' });
      }
    );
  }

  refreshResearcherVisits()
  {
    this.researcherVisitService.getResearcherVisitsByFamilyId(this.family.id).subscribe(result=>{this.researcherVisitsList = <ResearcherVisitCR[]> result;});
  }

  deleteResearcherVisit(data)
  {
    let visitId:number = data.id;
    let familyId:number = data.familyId;
    this.researcherVisitService.deleteResearcherVisit(visitId, familyId).subscribe(result=>{this.researcherVisitsList = <ResearcherVisitCR[]> result;});
  }
}

