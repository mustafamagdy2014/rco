import { Message } from 'primeng/primeng';
import { Injectable } from '@angular/core';
import { RcoMessage } from '../common/rco-message';
import { NextOfKin } from '../domain/NextOfKin';

@Injectable()
export class NextOfKinValidationService {
 
  msgs:Message[]=[];
  constructor() { }

  validateNextOfKinDetails(nextOfKin:NextOfKin):Message[]{
    this.msgs=[];
  
    if(nextOfKin.cpr==undefined ||nextOfKin.cpr==null || isNaN(+nextOfKin.cpr) ||nextOfKin.cpr.toString()==="" ){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_NEXT_OF_KIN_CPR_NUMBER});
    }

    if(nextOfKin.contact.mobile==undefined ||nextOfKin.contact.mobile==null||isNaN(+nextOfKin.contact.mobile)||nextOfKin.contact.mobile.toString()===""){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_MOBILE_NUMBER});
    }

    return this.msgs;
  }


}
