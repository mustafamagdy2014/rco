import { Bank } from "./bank";

export class AccountCR {
    createdBy?: any;
    createdOn: any;
    updatedBy?: any;
    updatedOn: any;
    id: number;
    bank: Bank;
    cpr: number;
    accountNo: string;
    iban: string;
}