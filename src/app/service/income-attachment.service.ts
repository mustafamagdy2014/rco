import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Resource } from "../common/resource";

@Injectable()
export class IncomeAttachmentService {

  constructor(private http: HttpClient) {}

  getIncomeAttachment(attachmentId: number) {
    return this.http
      .get(Resource.GET_INCOME_ATTACHMENT_URL+attachmentId);
  }

  deleteIncomeAttachment(attachmentId: number, incomeId?: number) {
    let url = Resource.DELETE_INCOME_ATTACHMENT_URL + attachmentId;
    return this.http.delete(url + (incomeId?"&incomeId="+incomeId:""));
  }

  deleteIncome(incomeId: number, attachmentId?: number) {
      let url = Resource.DELETE_INCOME_URL + incomeId;
      return this.http.delete(url+ (attachmentId?"&attachmentId="+attachmentId:""));
  }

  downloadFile(id: number) {
    return this.http.get(Resource.GET_INCOME_ATTACHMENT_URL + id, { responseType: 'blob' });
  }

}
