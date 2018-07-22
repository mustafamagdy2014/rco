import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
import { RcoMessage } from '../common/rco-message';
import { isNumber } from 'util';

@Injectable()
export class IncomeValidationService {
  msgs: Message[] = [];
  constructor() { }

  validateIncomeAmount(amount:number):Message[]{
    this.msgs=[]; 
    if(amount==null || amount== undefined||isNaN(+amount)||amount.toString()===""){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_INCOME_AMOUNT});
    }
    return this.msgs;
      
  }
}
