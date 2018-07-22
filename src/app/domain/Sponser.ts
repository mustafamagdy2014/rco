import { Account } from "./Account";
import { Contact } from "./Contact";

export class Sponser{
    createdBy?: any;
    createdOn?: number;
    updatedBy?: any;
    updatedOn?: number;
    cpr: number;
    contact: Contact;
    accounts: Account[];
    personArabicName?: any;
    personEnglishName?: any;
}