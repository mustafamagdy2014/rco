import { Resource } from './../../../common/resource';
import { ExpenseAttachmentService } from './../../../service/expense-attachment.service';
import { AppService } from './../../../service/app.service';
import { Attachment } from './../../../domain/Attachment';
import { Globals } from './../../../common/globals';
import { element } from 'protractor';
import { Input, AfterViewInit, ViewChild } from '@angular/core';
import { Expense } from './../../../domain/Expense';
import { Car } from './../../../domain/car';
import { Component, OnInit } from '@angular/core';
import { Family } from '../../../domain/Family';
import { Lookup } from '../../../domain/lookup';
import { ExpenseType } from '../../../domain/ExpenseType';
import { ExpenseValidationService } from '../../../service/expense-validation.service';
import { Message, FileUpload } from 'primeng/primeng';
import { RcoMessage } from '../../../common/rco-message';
import { saveAs } from 'file-saver';

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  providers:[ExpenseValidationService]
})
export class ExpenseComponent implements OnInit {

  @Input()
  family:Family;
  @Input()
  rcoLookup:Lookup;
  @Input()
  isViewState:boolean;
  @ViewChild('expenseUploader')
  expenseUploader:FileUpload;
  
  displayDialog: boolean;

  expense: Expense;

  selectedExpense: Expense;

  newExpense: boolean;

  uploadURL = Resource.UPLOAD_EXPENSE_ATTACHMENT_URL;
  newAttachmentId: number;

  header:string;
  cols: any[];
  expenseMessages: Message[] = [];
  formattedAmount: string;

  constructor(private globals:Globals, private expenseValidationService:ExpenseValidationService, private expenseAttachmentService: ExpenseAttachmentService,private appService:AppService) {
    this.header=globals.EXPENSE_HEADER;
    this.displayDialog=false;
    this.expense=new Expense();
    this.selectedExpense=new Expense();
   
  }

  ngOnInit() 
  {
      this.cols = 
      [
          { header: 'نوع الالتزام' },
          { header: 'القيمة' },
          { header: 'المرفقات' }
      ];
  }

  ExpenseUploadHandler(event) 
  {    
    
    let expenseAttachment:Attachment = <Attachment>JSON.parse(event.xhr["response"]);
   //  expenseAttachment.thumbnail = this.sanitizer.bypassSecurityTrustUrl(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
    this.save(expenseAttachment);
   
    
  }

  showDialogToAdd() 
  {
      this.newExpense = true;
      this.expense = new Expense();
      this.expense.expenseType=this.rcoLookup["EXPENSE_TYPE"][0];
      this.displayDialog = true;
  }
 customSave(){
    this.expenseMessages=[];
    let msgs =  this.expenseValidationService.validateExpenseAmount(this.expense.expenseAmount);
    
    if(msgs.length==0)//no validation errors
    {
        if(this.expenseUploader.files.length!=0){
            this.expenseUploader.upload();
        
           
        }else{
            this.save();
        }
    }
    else
    {
      this.expenseMessages=[...msgs];
    }

 }
  save(expenseAttachment?:Attachment) 
  {
     
      let expenses = [...this.family.expenses];
             
      if(expenseAttachment&&expenseAttachment.id==null){
          this.expenseMessages.push({severity:"error",detail:RcoMessage.ATTACHMENT_UPLOAD_FAILED});
          return;
      }
      this.expense.expenseAttachment={...expenseAttachment};

          if (this.newExpense) 
          {
            expenses.push(this.expense);
          }
          else 
          {
            expenses[this.family.expenses.indexOf(this.selectedExpense)] = this.expense;
          }

          this.family.expenses = expenses;
          this.expense = null;
          this.displayDialog = false;
      
  }

  delete() 
  {
      let index = this.family.expenses.indexOf(this.selectedExpense);
      this.family.expenses = this.family.expenses.filter((val, i) => i != index);
      this.expense = null;
      this.displayDialog = false;
  } 

  onRowSelect(event) 
  {
      if(!this.isViewState){

      this.newExpense = false;
      this.expense = this.cloneExpense(event.data);
      this.displayDialog = true;
      }
  }

  cloneExpense(i: Expense): Expense 
  {
      let expense = new Expense();
      expense = {...i};
      expense.expenseType={...i.expenseType};
      return expense;
  }

  downloadAttachment(expenseAttachment: Attachment):void{
    this.expenseAttachmentService.downloadFile(expenseAttachment.id).subscribe(
     data => saveAs(data, expenseAttachment.fileName));
}

updateUploadRequest(event){
    event.xhr.setRequestHeader("Authorization", `Bearer ${this.appService.getAccessToken()}`);
  }
}
