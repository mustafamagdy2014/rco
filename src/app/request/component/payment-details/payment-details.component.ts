import { BeneficiaryPaymentDetailsHistory } from './../../../domain/BeneficiaryPaymentDetailsHistory';
import { Globals } from './../../../common/globals';
import { PaymentDetailsService } from './../../../service/payment-details.service';
import { BeneficiaryPaymentWrapper } from './../../../domain/BeneficiaryPaymentWrapper';
import { Component, OnInit, Input } from '@angular/core';
import { BeneficiaryPaymentDetails } from '../../../domain/BeneficiaryPaymentDetails';

@Component({
  selector: 'payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  @Input()
  cpr:number;

  paymentDetailsList:BeneficiaryPaymentDetails[];
  header:string;
  cols: any[];
  dateFormat:string = Globals.DATE_FMT;

  constructor(private globals:Globals, private paymentDetailsService:PaymentDetailsService)
  {
    this.header = globals.PAYMENT_DETAILS_HEADER;
  }

  ngOnInit() 
  {
    this.cols = 
      [
          { header: 'تاريخ بداية الكفالة' },
          { header: 'تاريخ نهاية الكفالة' },
          { header: 'المبلغ بالدينار البحريني' }
      ];
    this.paymentDetailsService.getPaymentDetails(this.cpr).subscribe(
      result=>{ this.paymentDetailsList=<BeneficiaryPaymentDetails[]> result;
      });
    
  }

}
