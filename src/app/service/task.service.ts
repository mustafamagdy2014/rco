import { ServiceType } from './../domain/ServiceType';
import { Status } from './../domain/Status';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestType } from '../domain/RequestType';
import { Resource } from '../common/resource';
import { SponsorshipTaskWrapper } from '../domain/SponsorshipTaskWrapper';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  search(requestDateFrom: string, requestDateTo: string, requestTypeId: number, statusId: number, serviceTypeId: number) {
    let url = Resource.SEARCH_USER_TASKS + '?';
    url += 'requestDateFromString=' + requestDateFrom + '&';
    url += 'requestDateToString=' + requestDateTo + '&';
    url += 'statusId=' + statusId + '&';
    url += 'requestTypeId=' + requestTypeId + '&';
    url += 'serviceTypeId=' + serviceTypeId;
    return this.http.get(url);
  }


  getUserTasks() {
    return this.http.get<SponsorshipTaskWrapper[]>(Resource.GET_USER_TASKS);
  }
}
