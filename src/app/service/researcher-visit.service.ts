import { ResearcherVisitDTO } from './../domain/ResearcherVisitDTO';
import { ServiceType } from './../domain/ServiceType';
import { Status } from './../domain/Status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestType } from '../domain/RequestType';
import { Resource } from '../common/resource';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ResearcherVisitService {

  constructor(private http: HttpClient) { }

  getResearcherVisitsByFamilyId(familyId:number)
  {
    return this.http.get(Resource.GET_RESEARCHER_VISITS_BY_FAMILY_ID+familyId);
  }

  getNextOfKinAddress(cpr:number)
  {
    return this.http.get(Resource.GET_PERSON_ADDRESS+cpr);
  }

  addResearcherVisit(familyId:number, nextOfKinCPR:number, visitDate:string, visitStartTime:string, visitEndTime:string)
  {
    let dto = new ResearcherVisitDTO(familyId, nextOfKinCPR, visitDate, visitStartTime, visitEndTime, -1);
    return this.http.post(Resource.ADD_RESEARCHER_VISIT,dto);
  }

  updateResearcherVisitSchedule(familyId:number, nextOfKinCPR:number, visitDate:string, visitStartTime:string, visitEndTime:string, visitId:number)
  {
    let dto = new ResearcherVisitDTO(familyId, -1, visitDate, visitStartTime, visitEndTime, visitId);
    return this.http.put(Resource.UPDATE_RESEARCHER_VISIT_SCHEDULE, dto);
  }

  deleteResearcherVisit(visitId: number, familyId:number)
  {
    return this.http.delete(Resource.DELETE_RESEARCHER_VISIT_URL+visitId+'&familyId='+familyId);
  }
}
