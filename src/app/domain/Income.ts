import { Attachment } from './Attachment';
import { IncomeType } from './IncomeType';
import { Family } from './Family';

export class Income
{
    id:number;
    family:Family;
    incomeType:IncomeType
    incomeAmount:number;
    incomeAttachment: Attachment;

    createdBy?: string;
    createdOn?: Date;
    updatedBy?: string;
    updatedOn?: Date;
}