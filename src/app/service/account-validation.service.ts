import { Message } from 'primeng/primeng';
import { Injectable } from '@angular/core';
import { Account } from '../domain/Account';
import { RcoMessage } from '../common/rco-message';

@Injectable()
export class AccountValidationService {

  msgs:Message[]=[];

  constructor() { }
  validateAccountDetails(account:Account):Message[]{
    this.msgs=[]; 
    if(account.accountNo==undefined || account.accountNo==null||isNaN(+account.accountNo)||account.accountNo===""){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_BANK_ACCOUNT});
    }
    return this.msgs;
  }
}
