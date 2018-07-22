import { Injectable } from '@angular/core';
import { Resource } from '../common/resource';
import { HttpClient } from '@angular/common/http';
import { Attachment } from '../domain/Attachment';

@Injectable()
export class AttachmentService {
  constructor(private http: HttpClient) { }

  getAttachmentList(attachmentTypeId: number, reqId?: number, changeRequestId?:number) 
  {
    
    if(attachmentTypeId==6)//change request attachment
    {
      return this.http
      .get<Attachment[]>(Resource.GET_ATTACHMENT_LIST + changeRequestId + '/' + attachmentTypeId);
    }
    else
    {
      
      return this.http
      .get<Attachment[]>(Resource.GET_ATTACHMENT_LIST + reqId + '/' + attachmentTypeId);
    }
  }

  deleteAttachmentList(id: number) {
    return this.http
      .get(Resource.DELETE_ATTACHMENT + id);
  }

  downloadFile(id: string) {
    return this.http.get(Resource.GET_ATTACHMENT_FILE + id, { responseType: 'blob' });
  }
}
