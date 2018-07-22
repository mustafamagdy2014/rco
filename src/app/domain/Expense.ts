import { Attachment } from './Attachment';
import { ExpenseType } from './ExpenseType';
import { Family } from './Family';

export class Expense
{
    id:number;
    family:Family;
    expenseType:ExpenseType
    expenseAmount:number;
    expenseAttachment: Attachment;

    createdBy?: string;
    createdOn?: Date;
    updatedBy?: string;
    updatedOn?: Date;
}