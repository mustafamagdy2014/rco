import { SponsershipChangeRequest } from './../../../domain/SponsershipChangeRequest';
import { Component, OnInit, Input } from '@angular/core';
import { SponsershipRequest } from '../../../domain/SponsershipRequest';
import { Globals } from '../../../common/globals';
import { SponsershipComments } from '../../../domain/SponsershipComments';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AppService } from '../../../service/app.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() sponsershipRequest: SponsershipRequest;
  @Input() isViewState: boolean;

  @Input() isSponsershipChangeRequest: boolean;
  @Input() sponsershipChangeRequest: SponsershipChangeRequest;

  commentMessages: Message[] = [];
  header: string;
  cols: any[];
  displayDialog: boolean;
  newComment: boolean;
  comment: SponsershipComments;
  selectedComment: SponsershipComments;

  constructor(private globals: Globals, private appService: AppService) {
  }

  ngOnInit() {
    this.header = this.globals.COMMENT_HEADER;
    this.cols = [
      { header: 'المرسل' },
      { header: 'تاريخ الارسال' },
      { header: 'النص' }
    ];
    if(this.isSponsershipChangeRequest)
    {
      if (!this.sponsershipChangeRequest.sponsershipComments) {
        this.sponsershipChangeRequest.sponsershipComments = Array<
          SponsershipComments
          >();
      }
    }
    else
    {
      if (!this.sponsershipRequest.sponsershipComments) {
        this.sponsershipRequest.sponsershipComments = Array<
          SponsershipComments
          >();
      }
    }
    
  }
  showDialogToAdd() {
    this.newComment = true;
    this.comment = new SponsershipComments();
    this.comment.comment = '';
    this.displayDialog = true;
  }
  save() {
    if (this.newComment) 
    {
      if (this.comment.comment.trim().length !== 0) 
      {
        this.comment.createdOn = new Date();
        this.comment.createdBy = this.appService.User.user_name;
        if(this.isSponsershipChangeRequest)
        {
          this.sponsershipChangeRequest.sponsershipComments.push(this.comment);
        }
        else
        {
          this.sponsershipRequest.sponsershipComments.push(this.comment);
        }
      }
    } 
    else 
    {
      this.comment.updatedOn = new Date();
      this.comment.updatedBy = this.appService.User.user_name;
      if(this.isSponsershipChangeRequest)
      {
        this.sponsershipChangeRequest.sponsershipComments[
          this.sponsershipChangeRequest.sponsershipComments.indexOf(
            this.selectedComment
          )
        ] = this.comment;
      }
      else
      {
        this.sponsershipRequest.sponsershipComments[
          this.sponsershipRequest.sponsershipComments.indexOf(
            this.selectedComment
          )
        ] = this.comment;
      }
    }
    this.commentMessages = [];
    this.comment = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newComment = false;
    this.comment = event.data;
    this.displayDialog = true;
  }

  delete() 
  {
    if(this.isSponsershipChangeRequest)
    {
      const index = this.sponsershipChangeRequest.sponsershipComments.indexOf(
        this.selectedComment
      );
      this.sponsershipChangeRequest.sponsershipComments = this.sponsershipChangeRequest.sponsershipComments.filter(
        (val, i) => i !== index
      );
    }
    else
    {
      const index = this.sponsershipRequest.sponsershipComments.indexOf(
        this.selectedComment
      );
      this.sponsershipRequest.sponsershipComments = this.sponsershipRequest.sponsershipComments.filter(
        (val, i) => i !== index
      );
    }
    this.comment = null;
    this.displayDialog = false;
  }
}
