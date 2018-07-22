import { Globals } from './../../../common/globals';
import { Component, OnInit, Input, Output } from '@angular/core';
import { VisitDetailService } from '../../../service/visit-detail.service';
import { Question } from '../../../domain/Question';
import { Car } from '../../../domain/car';
import { SponsershipRequest } from '../../../domain/SponsershipRequest';
import { FamilyMember } from '../../../domain/FamilyMember';
import { VisitDetails } from '../../../domain/VisitDetails';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { forEach } from '@angular/router/src/utils/collection';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Family } from '../../../domain/Family';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss'],
  providers: [MessageService]
})
export class VisitDetailsComponent implements OnInit {
  @Input() family: Family;
  @Input() visitId: number;
  @Input() plannedVisitDate: Date;
  @Input() plannedVisitStartTime: Date;
  @Input() plannedVisitEndTime: Date;
  questions: Question[] = [];
  answers: VisitDetails[] = [];
  result: VisitDetails[] = [];
  hideNoSubOption = true;
  hideYesSubOption = true;
  hideOtherOption = false;
  @Input() msgs: Message[] = [];

  dateFormat:string = Globals.DATE_FMT;
  maxDate:Date = new Date();
  //the following variables are for the actual visit date (initilaized with the planned visit date)
  visitDate:Date;
  visitStartTime:Date;
  visitEndTime:Date;

  constructor(private visitDetailService: VisitDetailService, private messageService: MessageService) { }

  ngOnInit() {
    this.visitDate=this.plannedVisitDate;
    this.visitStartTime=this.plannedVisitStartTime;
    this.visitEndTime=this.plannedVisitEndTime;
    
    const question_observable = this.visitDetailService.getQuestionList();
    const answers_observable = this.visitDetailService.getAnswerList(this.visitId);
    forkJoin([question_observable, answers_observable]).subscribe(result => {
      this.questions = <Question[]>result[0];
      this.answers = <VisitDetails[]>result[1];
    });

    this.visitDetailService.getQuestionList().subscribe(res => {
      this.questions = <Question[]>res;
      this.visitDetailService.getAnswerList(this.visitId).subscribe(
        resAnswer => {
          this.answers = <VisitDetails[]>resAnswer;
          this.AnswerWrapper();
        });
    });
  }

  AnswerWrapper() {

    this.questions.forEach(question => {
      if (question.questionType.nameEn === 'true/false, if-false') {
        if (question.subQuestion && question.subQuestion.dynamicKey === 'orphans') {
          this.loadOrphans(question);
        }
      }
      let qAnswer = [];
      if (this.answers) {
        qAnswer = this.answers.filter(item => item.questionId === question.id);
      }
      if (qAnswer.length > 0) {
        question.questionOption.forEach(option => {
          let keepGoing = true;
          qAnswer.forEach(value => {

            if (keepGoing) {
              if (option.id === parseInt(value.optionId, 10)) {
                option.Selected = true;
                if ((question.questionType.nameEn === 'true/false, if-false')
                  && option.optionEn === 'No') {
                  this.hideNoSubOption = false;
                }
                if ((question.questionType.nameEn === 'true/false, if-true')
                  && option.optionEn === 'Yes') {
                  question.text = value.text;
                  this.hideYesSubOption = false;
                }
                if (question.questionType.nameEn === 'long answer') {
                  question.text = value.text;
                }
                if (option.optionEn === 'other') {
                  option.text = value.text;
                }
                keepGoing = false;
              } else {
                option.Selected = false;
              }
            }
          });
        });
      }
    });
  }

  loadOrphans(question: Question) {
    question.subQuestion.questionOption = [];
    const fm = this.family.familyMembers;

    fm.forEach(member => {
      const code = member.familyRelationCode.id;
      if (code === 3 || code === 4) {
        let personSelected = false;
        this.answers.forEach(answer => {
          if (answer.optionId.localeCompare(member.cpr) === 0) {
            personSelected = true;
          }
        });
        question.subQuestion.questionOption.push({
          id: parseInt(member.cpr, 10),
          optionAr: member.personArabicName,
          optionEn: member.personEnglishName,
          Selected: personSelected
        });

      }

    });
  }

  updateSelection(option, question) {
    const optionId = option.id;
    question.questionOption.forEach(questionOption => {
      if (optionId !== questionOption.id) {
        questionOption.Selected = false;
      }
    });
    if (option.optionEn === 'other') {
      this.hideOtherOption = true;
    }
    if (question.questionType.nameEn === 'true/false, if-false') {
      if (option.optionEn.localeCompare('No') === 0) {
        this.hideNoSubOption = false;
      } else {
        this.hideNoSubOption = true;
      }
    }
    if (question.questionType.nameEn === 'true/false, if-true') {
      if (option.optionEn.localeCompare('Yes') === 0) {
        this.hideYesSubOption = false;
      } else {
        this.hideYesSubOption = true;
      }

    }
  }
  save() {
    this.result = [];
    this.questions.forEach(question => {
      question.questionOption.forEach(option => {

        if (question.questionType.nameEn.localeCompare('long answer') === 0) {
          if (question.text) {
            const obj = {
              questionId: question.id,
              optionId: option.id + '',
              text: question.text,
            };
            this.result.push(obj);
          }
        } else if ((question.questionType.nameEn.localeCompare('true/false, if-false') === 0)
          && option.Selected && option.optionEn.localeCompare('No') === 0) {
          let obj = {
            questionId: question.id,
            optionId: option.id + '',
          };

          this.result.push(obj);
          question.subQuestion.questionOption.forEach(option2 => {
            obj = {
              questionId: question.id,
              optionId: option2.id + '',
            };
            if (option2.Selected) {
              this.result.push(obj);
            }
          });
        } else if ((question.questionType.nameEn.localeCompare('true/false, if-true') === 0)
          && option.Selected && option.optionEn.localeCompare('Yes') === 0) {
          const obj = {
            questionId: question.id,
            optionId: option.id + '',
            text: question.text
          };
          this.result.push(obj);
        } else if (option.Selected) {
          let obj: VisitDetails;
          if (option.optionEn && option.optionEn.localeCompare('other') === 0) {
            obj = {
              questionId: question.id,
              optionId: option.id + '',
              text: option.text
            };
          } else {
            obj = {
              questionId: question.id,
              optionId: option.id + '',
            };

          }
          this.result.push(obj);
        }
      });
    });

    //format visitDate
    let visitDateFormattedString = this.formatDate(this.visitDate);
    //format visitStartTime
    let visitStartTimeFormattedString = this.formatTime(this.visitStartTime);
    //format visitEndTime
    let visitEndTimeFormattedString = this.formatTime(this.visitEndTime);

    this.visitDetailService.addAnswerList(this.result, this.visitId, visitDateFormattedString, visitStartTimeFormattedString, visitEndTimeFormattedString ).subscribe(
      res => {
        this.msgs.push({ severity: 'success', summary: 'تم', detail: 'تم عملية الحفظ بنجاح' });
      });
  }

  formatDate(date:Date)
  {
    let day:string, month:string, year:number;
    let dateFormattedString = "-1";

    day = ("0" + date.getDate());
    if(day.length===3)
    {
      day = day.substr(1);
    }
    month = ("0" + (date.getMonth() + 1)); // add 1 because months are indexed from 0
    if(month.length===3)
    {
      month = month.substr(1);
    }
    year = this.visitDate.getFullYear();
    dateFormattedString = year +"-"+month+"-"+day;
    return dateFormattedString;
  }

  formatTime(time:Date)
  {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let am = hours >= 12 ? 'pm' : 'am'; hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    let timeFormattedString = hours + ':' + minutes + ' ' + am;
    return timeFormattedString;
  }

}
