import { Component, OnInit } from '@angular/core';
import { SponsorshipTaskWrapper } from '../../domain/SponsorshipTaskWrapper';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  sponsorshipTaskWrapper:SponsorshipTaskWrapper[];
  constructor() { }

  ngOnInit() {
  }

  showTaskSearchResult($event)
  {
    this.sponsorshipTaskWrapper=$event;
  }

}
