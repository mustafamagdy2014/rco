import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../common/resource';
import { UtilityService } from './utility.service';

@Injectable()
export class MeetingService {

  constructor(private httpClient: HttpClient, private utilityService: UtilityService) { }

  getMeetingList() {
    return this.httpClient.get(Resource.GET_MEETING_URL);
  }

  getMeeting(id) {
    return this.httpClient.get(Resource.GET_MEETING_URL + id);
  }
  getMeetingTasks(id) {
    const url = this.utilityService.replacePattern(Resource.GET_MEETING_TASKS_URL, ['{id}'], [id]);
    return this.httpClient.get(url);
  }

  saveMeeting(meetingDate) {
    return this.httpClient.post(Resource.POST_MEETING_URL, meetingDate);
  }

  updateMeeting(meetingDate, id) {
    return this.httpClient.post(Resource.POST_UPDATE_MEETING_URL + id, meetingDate);
  }

  deleteMeeting(id) {
    return this.httpClient.delete(Resource.POST_MEETING_URL + id);
  }

  getCommitteeMembers() {
    return this.httpClient.get(Resource.GET_MEETING_MEMBER_URL);
  }

  saveMeetingMembers(id, committeeMembers) {
    const url = this.utilityService.replacePattern(Resource.POST_MEETING_MEMBERS_URL, ['{id}'], [id]);
    return this.httpClient.post(url, committeeMembers);
  }
  endCommitteeMeeting(id){
    const url = this.utilityService.replacePattern(Resource.PUT_END_COMMITTEE_MEETING, ['{id}'], [id]);
    return this.httpClient.put(url,null);
  }
}
