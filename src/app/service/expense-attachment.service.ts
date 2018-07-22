import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Resource } from "../common/resource";

@Injectable()
export class ExpenseAttachmentService {

  constructor(private http: HttpClient) {}

  //The following methods are working for the income, should be modified (pamaeters,names,calls from .html to work with the expense)

  // getIncomeAttachment(attachmentId: number) {
  //   return this.http
  //     .get(Resource.GET_INCOME_ATTACHMENT_URL+attachmentId);
  // }

  // deleteIncomeAttachment(attachmentId: number, incomeId?: number) {
  //   let url = Resource.DELETE_INCOME_ATTACHMENT_URL + attachmentId;
  //   return this.http.delete(url + (incomeId?"&incomeId="+incomeId:""));
  // }

  // deleteIncome(incomeId: number, attachmentId?: number) {
  //     let url = Resource.DELETE_INCOME_URL + incomeId;
  //     debugger
  //     return this.http.delete(url+ (attachmentId?"&attachmentId="+attachmentId:""));
  // }

  downloadFile(id: number) {
    return this.http.get(Resource.GET_EXPENSE_ATTACHMENT_URL + id, { responseType: 'blob' });
  }

}
