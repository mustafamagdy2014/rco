import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Resource } from "./common/resource";
import { ResearcherVisitCR } from "./domain/ResearcherVisitCR";
import { ResearcherVisitCRDTO } from "./domain/ResearcherVisitCRDTO";

@Injectable()
export class ResearcherVisitChangeRequestService {

  constructor(private http: HttpClient) { }

  getResearcherVisitsByFamilyId(familyId:number)
  {
    return this.http.get(Resource.GET_CR_RESEARCHER_VISITS_BY_FAMILY_ID+familyId);
  }

  getNextOfKinAddress(cpr:number)
  {
    return this.http.get(Resource.GET_PERSON_ADDRESS+cpr);
  }

  addResearcherVisit(familyId:number, nextOfKinCPR:number, visitDate:string, visitStartTime:string, visitEndTime:string)
  {
    let dto = new ResearcherVisitCRDTO(familyId, nextOfKinCPR, visitDate, visitStartTime, visitEndTime, -1);
    return this.http.post(Resource.ADD_CR_RESEARCHER_VISIT,dto);
  }

  updateResearcherVisitSchedule(familyId:number, nextOfKinCPR:number, visitDate:string, visitStartTime:string, visitEndTime:string, visitId:number)
  {
    let dto = new ResearcherVisitCRDTO(familyId, -1, visitDate, visitStartTime, visitEndTime, visitId);
    return this.http.put(Resource.UPDATE_CR_RESEARCHER_VISIT_SCHEDULE, dto);
  }

  deleteResearcherVisit(visitId: number, familyId:number)
  {
    return this.http.delete(Resource.DELETE_CR_RESEARCHER_VISIT_URL+visitId+'&familyId='+familyId);
  }
}

