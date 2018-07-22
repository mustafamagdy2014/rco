import { ContactCR } from './ContactCR';
import { AccountCR } from './AccountCR';

export class SponserCR{
    createdBy?: any;
    createdOn?: number;
    updatedBy?: any;
    updatedOn?: number;
    cpr: number;
    contact: ContactCR;
    account: AccountCR;
    personArabicName?: any;
    personEnglishName?: any;
    changeRequestId:number;
}