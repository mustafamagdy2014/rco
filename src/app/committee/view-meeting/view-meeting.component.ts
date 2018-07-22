import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../../service/meeting.service';
import { CommitteeMeeting } from '../../domain/CommitteeMeeting';
import { TaskService } from '../../service/task.service';
import { SponsorshipTaskWrapper } from '../../domain/SponsorshipTaskWrapper';
import { FamilyMember } from '../../domain/FamilyMember';
import { Family } from '../../domain/Family';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message, ConfirmationService } from 'primeng/api';
//for creating a new meeting or view a meeting with id|!
@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.css'],
  providers: [ConfirmationService]
})
export class ViewMeetingComponent implements OnInit {
  msgs: Message[] = [];
  meetingDate: Date;
  minDateValue: Date = new Date();
  meeting: CommitteeMeeting;
  tasks: SponsorshipTaskWrapper[];
  tasksView: SponsorshipTaskWrapper[] = [];
  cols: any[];
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService,
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['meetingId'];
      console.log(id);
      if (id.trim().length !== 0) {
        this.meetingService.getMeeting(id).subscribe(res => {
          this.meeting = <CommitteeMeeting>res;
          this.meeting.meetingDate = new Date(this.meeting.meetingDate);
          this.meetingDate = this.meeting.meetingDate;
          this.meetingService.getMeetingTasks(id).subscribe(tasks => {
            this.tasks = <SponsorshipTaskWrapper[]>tasks;
          });
        });
      } else {
        this.taskService.getUserTasks().subscribe(res => {
          this.tasks = res;
          //to get tasks , that are not part of a meeting , new tasks only !! 
          this.tasks = this.tasks.filter(task => task.name.localeCompare('under committee secertary review') === 0);
          if (this.tasks.length === 0) {
            this.msgs.push({ severity: 'info', detail: 'لا يوجد طلبات جديدة' });
            setTimeout(() => {
              this.router.navigate(['/meeting']);
            }, 3000);
          }
        });
      }
    });

    this.cols = [
      { field: 'familyId', header: 'رقم الاسرة' },
      { field: 'fatherCpr', header: 'الرقم الشخصي' },
      { field: 'personArabicName', header: 'الاسم' },
      { field: 'serviceType', header: 'نوع الخدمة' },
      { field: 'requestType', header: 'نوع الطلب' },
      { field: 'requestCreationDate', header: 'تاريخ الطلب' },
      { field: 'requestStatus', header: 'حالة الطلب' },
      { field: 'stage', header: 'مرحلة الطلب' },
    ];
  }

  saveMeeting() {

    if (this.meeting && this.meeting.id) {
      this.meetingService.updateMeeting(this.meeting.meetingDate.getTime(), this.meeting.id).subscribe(res => {
        this.msgs.push({ severity: 'info', detail: 'تم التحديث بنجاح' });
        setTimeout(() => {
          this.router.navigate(['/meeting']);
        }, 3000);
      }, (err: Response) => {
        this.msgs.push({ severity: 'error', detail: 'حدث خطأ!' });
      });
    } else {
      this.meetingService.saveMeeting(this.meetingDate.getTime()).subscribe(res => {
        if (res === null) {
          this.msgs.push({ severity: 'info', detail: 'لا يوجد طلبات جديدة' });
        } else {
          this.msgs.push({ severity: 'success', detail: 'تم الحفظ بنجاح' });
          setTimeout(() => {
            this.router.navigate(['/meeting']);
          }, 3000);
        }
      }, (err: Response) => {
        this.msgs.push({ severity: 'error', detail: 'حدث خطأ!' });
      });
    }

  }

  deleteMeeting() {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من الحذف؟',
      header: 'تأكيد',
      icon: 'fa fa-question-circle',

      accept: () => {
        if (this.meeting.id) {
          this.meetingService.deleteMeeting(this.meeting.id).subscribe(res => {
            this.msgs = [
              {
                severity: 'success',
                summary: '  تأكيد  ',
                detail: ' تم الحذف بنجاح'
              }
            ]; setTimeout(() => {
              this.router.navigate(['/meeting']);
            }, 3000);
          }, (err: Response) => {
            this.msgs.push({ severity: 'error', detail: 'حدث خطأ!' });
          });
        } else {
          this.msgs.push({ severity: 'error', detail: 'رقم الاجتماع غير موجود' });
        }
      }
    });
  }

  cancel() {
    this._location.back();
  }

  father(fm: Family): FamilyMember {
    const father = fm.familyMembers.filter(member => member.familyRelationCode.code.localeCompare('FATHER') === 0)[0];
    return father;
  }
}
