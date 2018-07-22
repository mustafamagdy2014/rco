import { Message } from 'primeng/primeng';
import { Injectable } from '@angular/core';
import { Sponser } from '../domain/Sponser';
import { RcoMessage } from '../common/rco-message';

@Injectable()
export class SponserValidationService {
 
  msgs:Message[]=[];
  constructor() { }

  validateSponserDetails(sponser:Sponser):Message[]{
    this.msgs=[];
  console.log(+sponser.cpr+"  "+isNaN(+sponser.cpr));
    if(sponser.cpr==undefined ||sponser.cpr==null || isNaN(+sponser.cpr) ||sponser.cpr.toString()===""){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_SPONSER_CPR_NUMBER});
    }

    if(sponser.contact.mobile==undefined ||sponser.contact.mobile==null||isNaN(+sponser.contact.mobile)){
      this.msgs.push({severity:'error', detail:RcoMessage.ENTER_MOBILE_NUMBER});
    }

    return this.msgs;
  }


}
