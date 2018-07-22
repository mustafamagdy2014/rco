import { ActivatedRoute } from '@angular/router';
import { BeneficiaryPaymentMonthlyDifference } from './../../../domain/BeneficiaryPaymentMonthlyDifference';
import { Component, OnInit } from '@angular/core';
import { Year } from './../../../domain/Year';
import { ReportService } from './../../service/report.service';
import { Globals } from './../../../common/globals';
import { AppService } from './../../../service/app.service';
import { Input, ViewChild } from '@angular/core';
import { Lookup } from './../../../domain/lookup';
import { Month } from '../../../domain/Month';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'monthly-differences-report',
  templateUrl: './monthly-differences-report.component.html',
  styleUrls: ['./monthly-differences-report.component.css'],
  providers:[ReportService]
})
export class MonthlyDifferencesReportComponent implements OnInit {

  rcoLookup:any;

  @ViewChild('dt')
  dt:DataTable;

  firstMonth: Month;
  firstYear: Year;
  secondMonth: Month;
  secondYear: Year;
  monthlyDifferencesReportList:BeneficiaryPaymentMonthlyDifference[];
  reportName = "الفروقات الشهرية";

  cols:any[];

  constructor(private route:ActivatedRoute, private globals:Globals, private appService:AppService, private reportService:ReportService) { }

  ngOnInit() 
  {
    this.rcoLookup=this.route.snapshot.data.data;
    this.cols = 
    [
      { field:'difference', header: 'الفرق' },
      { field:'secondMonthAmount', header: 'المبلغ المستحق للشهر الثاني' },
      { field:'firstMonthAmount', header: 'المبلغ المستحق للشهر الأول' },
      { field:'cpr', header: 'الرقم الشخصي للمستفيد' }
    ];
  }

  getMonthlyDifferencesList()
  {
    return this.reportService.getMonthlyDifferencesList(this.firstMonth.id, this.firstYear.id, this.secondMonth.id, this.secondYear.id).subscribe(result=>{
      console.log(result);
      this.monthlyDifferencesReportList=<BeneficiaryPaymentMonthlyDifference[]>result;
    });
  }

  export()
  {
    this.reportName = " الفروقات الشهرية بين - شهر "+this.firstMonth.nameAr+" - سنة "+this.firstYear.nameAr+" و شهر"+this.secondMonth.nameAr+" - سنة "+this.secondYear.nameAr;
    this.dt.exportCSV();
  }

}



  

