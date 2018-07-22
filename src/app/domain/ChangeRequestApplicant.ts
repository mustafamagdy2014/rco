import { ChangeRequestChannel } from './ChangeRequestChannel';
import { Contact } from "./Contact";

export class ChangeRequestApplicant
{
    id:number;
    cpr: number;
    relativeRelation:string;
    contact: Contact = new Contact();
    requestChannel:ChangeRequestChannel = new ChangeRequestChannel();
    personArabicName?: any;
    personEnglishName?: any;
}