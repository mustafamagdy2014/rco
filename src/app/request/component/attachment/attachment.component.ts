import { environment } from './../../../../environments/environment';
import { SponsershipChangeRequest } from './../../../domain/SponsershipChangeRequest';
import { Globals } from './../../../common/globals';
import { element } from 'protractor';
import { Input, AfterViewInit } from '@angular/core';
import { Car } from './../../../domain/car';
import { Component, OnInit } from '@angular/core';
import { Family } from '../../../domain/Family';
import { Lookup } from '../../../domain/lookup';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Attachment } from '../../../domain/Attachment';
import { AttachmentService } from '../../../service/attachment.service';
import { SponsershipRequest } from '../../../domain/SponsershipRequest';
import { Resource } from '../../../common/resource';
import { UtilityService } from '../../../service/utility.service';
import { AttachmentType } from '../../../domain/AttachmentType';
import { AppService } from '../../../service/app.service';
import { saveAs } from 'file-saver';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
  providers: [ConfirmationService]
})
export class AttachmentComponent implements OnInit {
  @Input() rcoLookup: Lookup;

  @Input() sponsershipRequest: SponsershipRequest;

  @Input() isViewState: boolean;

  @Input() isSponsershipChangeRequest: boolean;
  @Input() sponsershipChangeRequest: SponsershipChangeRequest;

  attachments: Attachment[];
  attachment: Attachment;
  attachmentfile: any;
  displayDialog: boolean;
  newAttachment: boolean;
  header: string;
  cols: any[];
  attachmentMessages: Message[] = [];
  lookupRCOAttachment: AttachmentType[] = [];
  confirmMsgs: Message[] = [];
  url: any = environment.resourceServer+'attachment/get?id=1';
  constructor(
    private globals: Globals,
    private utilityService: UtilityService,
    private attachmentService: AttachmentService,
    private confirmationService: ConfirmationService,
    private appService: AppService
  ) {
    this.displayDialog = false;
  }

  ngOnInit() {
    this.header = this.globals.ATTACHMENT_HEADER;
    this.cols = [
      { header: 'نوع المرفق' },
      { header: 'اسم الملف' },
      { header: 'حجم الملف' },
      { header: 'حذف' }
    ];

    this.getAttachmentList();

    // tslint:disable-next-line:no-shadowed-variable
    this.rcoLookup['ATTACHMENT_TYPE'].forEach(element => {
      if (element.id === 3 || element.id === 4 || element.id === 5) {
      } else {
        this.lookupRCOAttachment.push(element);
      }
    });
  }

  getAttachmentList() {
    if (
      this.sponsershipRequest &&
      this.sponsershipRequest.id &&
      this.isViewState
    ) {
      // 1 => get All files Except income & expense & visit attachments
      this.attachmentService
        .getAttachmentList(1, this.sponsershipRequest.id, null)
        .subscribe(res => {
          this.sponsershipRequest.attachments = res;
        });
    }
    else if(this.isSponsershipChangeRequest)
    {
      
      //typeId = 6 for change request attachments
      
      if(this.sponsershipChangeRequest.id)
      {
        this.attachmentService
      .getAttachmentList(6, null, this.sponsershipChangeRequest.id,)
      .subscribe(res => {
        
        this.sponsershipChangeRequest.attachments = res;
      });
      }
    }
  }
  onUploadFile(event: any): void 
  {
    const uploadFile = JSON.parse(event.xhr.response);
    this.attachment = { ...uploadFile };
    this.save();
  }

  showDialogToAdd() 
  {
    this.newAttachment = true;
    this.attachment = new Attachment();
    this.attachment.attachmentType = this.rcoLookup['ATTACHMENT_TYPE'][0];
    this.displayDialog = true;

    if(this.isSponsershipChangeRequest)
    {
      this.attachment.requestId = this.sponsershipChangeRequest.id;
    }
    else
    {
      this.attachment.requestId = this.sponsershipRequest.id;
    }
  }

  save() {
    this.getAttachmentList();
    if(this.isSponsershipChangeRequest)
    {
      this.sponsershipChangeRequest.attachments.push(this.attachment);
    }
    else
    {
      this.sponsershipRequest.attachments.push(this.attachment);
    }
    this.attachmentMessages = []; this.attachment = null;
    this.displayDialog = false;
  }

  deleteAttachment(attachment: any) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من الحذف؟',
      header: 'تأكيد',
      icon: 'fa fa-question-circle',

      accept: () => {
        this.attachmentService.deleteAttachmentList(attachment.id).subscribe(
          res => {
            if (this.sponsershipChangeRequest)
            {
              const index = this.sponsershipChangeRequest.attachments.indexOf(attachment);
              this.sponsershipChangeRequest.attachments = this.sponsershipChangeRequest.attachments.filter((val, i) => i !== index);
            }
            else
            {
              const index = this.sponsershipRequest.attachments.indexOf(attachment);
              this.sponsershipRequest.attachments = this.sponsershipRequest.attachments.filter((val, i) => i !== index);  
            }
            this.attachment = null;
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

  getUploadUrl(): string {

    const attachmentTypeId = this.attachment.attachmentType.id;
    const url = Resource.ATTACHMENT_UPLOAD_URL + attachmentTypeId;
    return url;

  }
  onBeforeSend(event) {
    if (this.sponsershipRequest && this.sponsershipRequest.id) 
    {
      event.formData.append('requestId', this.sponsershipRequest.id);
    }
    else if (this.sponsershipChangeRequest) 
    {
      event.formData.append('changeRequest', true);
      if(this.sponsershipChangeRequest.id)
      {
        event.formData.append('changeRequestId', this.sponsershipChangeRequest.id);
      }
    }
    event.xhr.setRequestHeader('Authorization', `Bearer ${this.appService.getAccessToken()}`);
  }
  download(file) {
    this.attachmentService.downloadFile(file.id).subscribe(
      data => saveAs(data, file.fileName)
    );
  }

}
