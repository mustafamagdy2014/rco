import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Resource } from "../common/resource";

@Injectable()
export class ResearcherVisitAttachmentService {

  constructor(private http: HttpClient) {}

  getResearcherVisitAttachment(attachmentId: number) {
    return this.http
      .get(Resource.GET_RESEARCHER_VISIT_ATTACHMENT_URL+attachmentId);
  }

  getResearcherVisitAttachmentsList(visitId: number) {
    return this.http
      .get(Resource.GET_RESEARCHER_VISIT_ATTACHMENTS_LIST_URL+visitId);
  }

  deleteResearcherVisitAttachment(attachmentId: number, researcherVisitId?: number) {
    let url = Resource.DELETE_RESEARCHER_VISIT_ATTACHMENT_URL + attachmentId;
    return this.http.delete(url + (researcherVisitId?"&researcherVisitId="+researcherVisitId:""));
  }

  downloadFile(id: number) {
    return this.http.get(Resource.GET_RESEARCHER_VISIT_ATTACHMENT_URL + id, { responseType: 'blob' });
  }

}

