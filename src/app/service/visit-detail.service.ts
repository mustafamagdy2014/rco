import { VisitDetailsDTO } from './../domain/VisitDetailsDTO';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../common/resource';
import { VisitDetails } from '../domain/VisitDetails';

@Injectable()
export class VisitDetailService {

  constructor(private httpClient: HttpClient, private logger: NGXLogger) { }

  getQuestionList() {
    return this.httpClient.get(Resource.GET_QUESTION_URL);
  }
  getAnswerList(visitId) {
    return this.httpClient.get(Resource.GET_ANSWERS_URL + visitId);
  }

  addAnswerList(visitDetails: VisitDetails[], visitId, visitDate:string, visitStartTime:string, visitEndTime:string) 
  {
    let visitDetailsDTO = new VisitDetailsDTO(visitId, visitDetails, visitDate, visitStartTime, visitEndTime);
    return this.httpClient.put(Resource.SAVE_VISIT_DETAILS+visitId, visitDetailsDTO);
  }
}
