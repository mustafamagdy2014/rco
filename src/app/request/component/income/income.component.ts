import { IncomeAttachmentService } from './../../../service/income-attachment.service';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Resource } from './../../../common/resource';
import { ConfirmationService } from 'primeng/api';
import { AttachmentService } from './../../../service/attachment.service';
import { Response, RequestOptions, ResponseContentType, Request, RequestMethod } from '@angular/http';
import { Attachment } from './../../../domain/Attachment';
import { Globals } from './../../../common/globals';
import { element } from 'protractor';
import { Input, AfterViewInit, ViewChild } from '@angular/core';
import { Income} from './../../../domain/Income';
import { Car } from './../../../domain/car';
import { Component, OnInit } from '@angular/core';
import { Family } from '../../../domain/Family';
import { Lookup } from '../../../domain/lookup';
import { IncomeType } from '../../../domain/IncomeType';
import { IncomeValidationService } from '../../../service/income-validation.service';
import { Message, FileUpload } from 'primeng/primeng';
import { DomSanitizer } from '@angular/platform-browser';
import { RcoMessage } from '../../../common/rco-message';
import { saveAs } from 'file-saver';
import { AppService } from '../../../service/app.service';
import { debug } from 'util';
@Component({
  selector: 'income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  providers:[IncomeValidationService]
})
export class IncomeComponent implements OnInit {

  @Input()
  family:Family;
  @Input()
  rcoLookup:Lookup;
  @Input()
  isViewState:boolean;
  @ViewChild('incomeUploader')
  incomeUploader:FileUpload;

  displayDialog: boolean;

  income: Income;

  selectedIncome: Income;

  selectedIncomeAttachment: Attachment;

  newIncome: boolean;

  uploadURL = Resource.UPLOAD_INCOME_ATTACHMENT_URL;
  newAttachmentId: number;

  header:string;
  cols: any[];
  incomeMessages: Message[] = [];
  formattedAmount: string;

  constructor(private globals:Globals, private incomeValidationService:IncomeValidationService,private sanitizer: DomSanitizer, private confirmationService:ConfirmationService, private incomeAttachmentService: IncomeAttachmentService,private appService:AppService) {
    this.displayDialog=false;
    this.income=new Income();
    this.selectedIncome=new Income();
   
  }

  ngOnInit() 
  {

      this.header=this.globals.INCOME_HEADER;
      this.cols = 
      [
          { header: 'نوع الدخل' },
          { header: 'القيمة' },
          { header: 'المرفقات' }
      ];
  }



  IncomeUploadHandler(event) 
  {    
    
    let incomeAttachment:Attachment= <Attachment>JSON.parse(event.xhr["response"]);
    this.newAttachmentId = incomeAttachment.id;
   //  incomeAttachment.thumbnail = this.sanitizer.bypassSecurityTrustUrl(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
    
    this.save(incomeAttachment);
   
    
  }

  showDialogToAdd() 
  {
      this.newIncome = true;
      this.income = new Income();
      this.income.incomeType=this.rcoLookup["INCOME_TYPE"][0];
      this.displayDialog = true;
  }
 customSave(){
    this.incomeMessages=[];
    let msgs =  this.incomeValidationService.validateIncomeAmount(this.income.incomeAmount);
    
    if(msgs.length==0)//no validation errors
    {
        //check if the uploadFileComponent is shown
        if(this.incomeUploader)
        {
          if(this.incomeUploader.files.length!=0)//the user chose a file to upload
          {
            this.incomeUploader.upload();
          }
          else
          {
              this.save();
          } 
        }
    }
    else
    {
      this.incomeMessages=[...msgs];
    }

 }
  save(incomeAttachment?:Attachment) 
  {
    if(incomeAttachment&&incomeAttachment.id==null){
        this.incomeMessages.push({severity:"error",detail:RcoMessage.ATTACHMENT_UPLOAD_FAILED});
        return;
    }
      let incomes = [...this.family.incomes];
      //new attachment added, update the corresponding income
      if(incomeAttachment)
      {
        this.income.incomeAttachment={...incomeAttachment};
      }
      else
      {
        if (this.newIncome) 
          {
            incomes.push(this.income);
          }
          else 
          {
            incomes[this.family.incomes.indexOf(this.selectedIncome)] = this.income;
          }

          this.family.incomes = incomes;
          this.income = null;
          this.displayDialog = false;
      }
  }

  delete() 
  {
    let incomeId = this.selectedIncome.id;
    if (!this.newIncome || incomeId) 
    {
      this.confirmationService.confirm(
        {
        message: "هل انت متأكد من مسح الدخل؟",
        header: "تأكيد",
        icon: "fa fa-question-circle",

        accept: () => 
        {
          
          let attachmentId: number;
          if(this.selectedIncome.incomeAttachment) attachmentId = this.selectedIncome.incomeAttachment.id;
          if(incomeId && attachmentId)
          {
            this.incomeAttachmentService.deleteIncome(this.selectedIncome.id, attachmentId).subscribe(res => {this.removeIncomeFromTable();}, err => {console.log("error in incomeAttachmentService.deleteIncome") });
          }
          else if(attachmentId && !incomeId)
          {
            this.incomeAttachmentService.deleteIncomeAttachment(attachmentId);
          }
        }
      });
    }
    else 
    {
      //check if user uploaded an attachment
      if(this.newAttachmentId)
      {
        this.incomeAttachmentService.deleteIncomeAttachment(this.newAttachmentId).subscribe(res => {this.removeIncomeFromTable();}, err => {console.log("error in incomeAttachmentService.deleteIncomeAttachment") });
      }
      else
      {
        this.removeIncomeFromTable();
      }
    }
  } 

  onRowSelect(event) 
  {
    if(!this.isViewState){

      this.newIncome = false;
      this.income = this.cloneIncome(event.data);
      this.displayDialog = true;
    }
  }

  cloneIncome(i: Income): Income 
  {
      let income = new Income();
      income = {...i};
      income.incomeType={...i.incomeType};
      return income;
  }

  showAttachmentDetails(incomeAttachment:Attachment) 
  {
      console.log('showAttachmentDetails');
      this.displayDialog = true;
  }

  downloadAttachment(incomeAttachment: Attachment):void{
     this.incomeAttachmentService.downloadFile(incomeAttachment.id).subscribe(
      data => saveAs(data, incomeAttachment.fileName));
}
  deleteAttachment() {
  

      console.log("in deleteAttachment");
      this.confirmationService.confirm({
      message: "هل انت متأكد من الحذف؟",
      header: "تأكيد",
      icon: "fa fa-question-circle",

      accept: () => {
        this.incomeAttachmentService.deleteIncomeAttachment(this.selectedIncome.id, this.selectedIncome.incomeAttachment.id).subscribe(
          res => {
            this.income.incomeAttachment = null;
            let index = this.family.incomes.indexOf(this.selectedIncome);
            this.family.incomes[index].incomeAttachment=null;
          },
          err => {}
        );
      }
    });
  }

  removeIncomeFromTable()
  {
    let index = this.family.incomes.indexOf(this.selectedIncome);
              this.family.incomes = this.family.incomes.filter((val, i) => i != index);
              this.income = null;
              this.displayDialog = false;
  }
  updateUploadRequest(event){
    event.xhr.setRequestHeader("Authorization", `Bearer ${this.appService.getAccessToken()}`);
  }


}
