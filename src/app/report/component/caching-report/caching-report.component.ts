import { UtilityService } from './../../../service/utility.service';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryPaymentDetails } from './../../../domain/BeneficiaryPaymentDetails';
import { Year } from './../../../domain/Year';
import { ReportService } from './../../service/report.service';
import { Globals } from './../../../common/globals';
import { AppService } from './../../../service/app.service';
import { Input, ViewChild } from '@angular/core';
import { Lookup } from './../../../domain/lookup';
import { Component, OnInit } from '@angular/core';
import { Month } from '../../../domain/Month';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'caching-report',
  templateUrl: './caching-report.component.html',
  styleUrls: ['./caching-report.component.css'],
  providers:[ReportService]
})
export class CachingReportComponent implements OnInit {

  rcoLookup:any;

  @ViewChild('dt')
  dt:DataTable;

  month: Month;// = this.rcoLookup["MONTH"][0];
  year: Year;// = this.rcoLookup["YEAR"][0];
  cashingReportList:BeneficiaryPaymentDetails[];
  reportName = "كشف الصرف";

  cols:any[];

  constructor(private utilityService:UtilityService, private route:ActivatedRoute, private globals:Globals, private appService:AppService, private reportService:ReportService) { }

  ngOnInit() 
  {
    this.rcoLookup=this.route.snapshot.data.data;
    this.cols = 
    [
        { field:'actualAmount', header: 'المبلغ' },
        { field:'accountNo', header: 'رقم الحساب' },
        { field:'bankName', header: 'اسم البنك' },
        { field:'maritalStatusArabicName', header: 'الحالة الاجتماعية' },
        { field:'personArabicName', header: 'الاسم' },
        { field:'cpr', header: 'الرقم الشخصي' },
        { field:'requestCreationDate', header: 'تاريخ التقديم' },
        { field:'familyId', header: 'رقم الأسرة' },
        { field:'serial', header: '#' }
    ];
  }

  getCashingList()
  {
    return this.reportService.getCashingList(this.month.id, this.year.id).subscribe(result => {
      this.cashingReportList = <BeneficiaryPaymentDetails[]>result;
      this.cashingReportList.forEach(beneficiaryPaymentDetails => {
        let requestCreationDate = beneficiaryPaymentDetails.requestCreationDate;
        beneficiaryPaymentDetails.requestCreationDate = this.utilityService.transformDate(requestCreationDate);
        beneficiaryPaymentDetails.accountNo = "'"+beneficiaryPaymentDetails.accountNo+"'";
      });
    });
  }

  export()
  {
    this.reportName = "كشف الصرف - شهر "+this.month.nameAr+" - سنة "+this.year.nameAr;
    this.dt.exportCSV();
  }

}
