import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../../service/meeting.service';
import { TaskService } from '../../service/task.service';
import { SponsorshipTaskWrapper } from '../../domain/SponsorshipTaskWrapper';
import { CommitteeMeeting } from '../../domain/CommitteeMeeting';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-meeting-action',
  templateUrl: './meeting-action.component.html',
  styleUrls: ['./meeting-action.component.css']
})
export class MeetingActionComponent implements OnInit {
  meeting: CommitteeMeeting;
  tasks: SponsorshipTaskWrapper[];
  tasksView: SponsorshipTaskWrapper[] = [];
  cols: any[];
  msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService,
    private taskService: TaskService, ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['meetingId'];
      console.log(id);
      if (id.trim().length !== 0) {
        this.meetingService.getMeeting(id).subscribe(res => {
          this.meeting = <CommitteeMeeting>res;
          this.meeting.meetingDate = new Date(this.meeting.meetingDate);

          this.meetingService.getMeetingTasks(id).subscribe(tasks => {
            this.tasks = <SponsorshipTaskWrapper[]>tasks;
          });
        });
      }
    });

  }

  endCommitteeMeeting():void{
    this.meetingService.endCommitteeMeeting(this.meeting.id).subscribe(result => {
     this.router.navigateByUrl("/task");
    });
  }

}
