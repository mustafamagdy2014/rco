import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../service/meeting.service';
import { CommitteeMeeting } from '../../domain/CommitteeMeeting';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, Message } from 'primeng/api';
import { Lookup } from '../../domain/lookup';
import { CommitteeMember } from '../../domain/CommitteeMember';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  meetingList: CommitteeMeeting[];
  msgs: Message[] = [];
  cols: any[];
  dateValue: Date;
  display = false;
  rcoLookup: any[];
  meetingStatus: Lookup[] = [];
  committeeMembers: CommitteeMember[];
  selectedMembers: number[] = [];
  selectedMeeting: CommitteeMeeting;
  blockedMeetingList:boolean=true;
  constructor(private meetingService: MeetingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.rcoLookup = this.route.snapshot.data.data;
    this.meetingStatus = this.rcoLookup['MEETING_STATUS'];
    this.meetingStatus.unshift({
      id: 0,
      code: null,
      nameAr: 'الكل',
      nameEn: 'All',
    });
    this.meetingService.getMeetingList().subscribe(res => {
      this.meetingList = <CommitteeMeeting[]>res;
      this.blockedMeetingList=false;
    });
    this.cols = [
      { field: 'id', header: 'رقم المتسلسل' },
      { field: 'meetingDate', header: 'تاريخ الاجتماع' },
      { field: 'committeeMeetingStatus', header: 'حالة الاجتماع' },
      { field: '', header: 'عرض الاجتماع' },
      { field: '', header: 'بدء الاجتماع' },
    ];
    this.meetingService.getCommitteeMembers().subscribe(res => {
      this.committeeMembers = <CommitteeMember[]>res;
    });
  }
  dateSelected(dt) {
    if (this.dateValue) {
      const date1 = new Date(this.dateValue);
      date1.setDate(this.dateValue.getDate() + 1);
      dt.filter(date1, 'meetingDate', 'lt');
    }
  }

  viewMeeting(meeting) {
    this.router.navigate(['viewMeeting', meeting.id]);
  }

  resumeMeeting(meeting) {
    this.router.navigate(['startMeeting', meeting.id]);
  }

  showDialog(meeting) {
    meeting.committeeMember.forEach(
      item => {
        this.selectedMembers.push(item.id);
      }
    );
    this.selectedMeeting = meeting;
    this.display = true;
  }
  callCheck() {
    this.selectedMeeting.committeeMember.forEach(member => {
      const toRemove = this.selectedMembers.filter(item => item === member.id);
      if (toRemove.length === 0) {
        const index = this.selectedMeeting.committeeMember.indexOf(member);
        this.selectedMeeting.committeeMember.splice(index, 1);
      }

    });
    this.selectedMembers.forEach(id => {
      const inlist = this.selectedMeeting.committeeMember.filter(member => member.id === id);
      if (inlist.length === 0) {
        const outlist = this.committeeMembers.filter(member => member.id === id);
        this.selectedMeeting.committeeMember.push(outlist[0]);
      }
    });

    const members = this.selectedMeeting.committeeMember;
    if (members && members.length >= 4) {
      // CHAIRMAN_CODE
      const chairmanIndex = members.filter(member => member.code.localeCompare('1') === 0);
      // VISE_CHAIRMAN_CODE)
      const viseChairmanIndex = members.filter(member => member.code.localeCompare('2') === 0);

      if (chairmanIndex.length === 0 && viseChairmanIndex.length === 0) {
        this.msgs.push({ severity: 'error', detail: 'يجب حضور المدير او المساعد لبدء الاجتماع' });
        return false;
      }
      this.meetingService.saveMeetingMembers(this.selectedMeeting.id, members).subscribe();
      this.router.navigate(['startMeeting', this.selectedMeeting.id]);



    } else {
      this.msgs.push({ severity: 'error', detail: 'الحضور غير كافي لبدء الاجتماع' });
      return false;
    }

  }
}
