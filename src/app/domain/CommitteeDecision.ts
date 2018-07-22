import { Decision } from './Decision';
import { BeneficiaryStatus } from './BeneficiaryStatus';
export class CommitteeDecision{
    id:number;
    cpr:number;
    startDate:Date;
    amount:number;
    beneficiaryStatus:BeneficiaryStatus;
    decision:Decision;
    numberOfMonthes:number;
    notes:string;
}