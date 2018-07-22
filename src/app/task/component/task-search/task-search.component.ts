import { AppService } from './../../../service/app.service';
import { UtilityService } from './../../../service/utility.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SponsorshipTaskWrapper } from './../../../domain/SponsorshipTaskWrapper';
import { TaskService } from './../../../service/task.service';
import { ServiceType } from './../../../domain/ServiceType';
import { Status } from './../../../domain/Status';
import { RequestType } from './../../../domain/RequestType';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {
  rcoLookup:any;
  rangeDates:Date;
  maxDate: Date = new Date();
  requestType:RequestType;
  status:Status;
  serviceType:ServiceType;
  sponsorshipTaskWrapperList:SponsorshipTaskWrapper[];
  @Output()
  sponsorshipTaskSearchResultRetrievedEvent=new EventEmitter<SponsorshipTaskWrapper[]>();

  constructor(private route:ActivatedRoute, private taskService:TaskService,private utilityService:UtilityService, private router: Router,public appService:AppService) { }

  ngOnInit() {
    this.rcoLookup=this.route.snapshot.data.data;
    this.status=this.rcoLookup["STATUS"][0];
    this.requestType=this.rcoLookup["REQUEST_TYPE"][0];
    this.serviceType=this.rcoLookup["SERVICE_TYPE"][0];
    this.search();
  }

  search()
  {
    let dayFrom:string, monthFrom:string, yearFrom:string, dayTo:string, monthTo:string, yearTo:string;
    let requestDateFrom = "-1", requestDateTo = "-1";
    if(this.rangeDates)
    {
      if(this.rangeDates[0])
      {
        dayFrom = ("0" + this.rangeDates[0].getDate());
        if(dayFrom.length===3)
        {
          dayFrom = dayFrom.substr(1);
        }
        monthFrom = ("0" + (this.rangeDates[0].getMonth() + 1)); // add 1 because months are indexed from 0
        if(monthFrom.length===3)
        {
          monthFrom = monthFrom.substr(1);
        }
        yearFrom = this.rangeDates[0].getFullYear();
        requestDateFrom = yearFrom +"-"+monthFrom+"-"+dayFrom;
      }
      if(this.rangeDates[1])
      {
        dayTo = ("0" + this.rangeDates[1].getDate());
        if(dayTo.length===3)
        {
          dayTo = dayTo.substr(1);
        }
        monthTo = ("0" + (this.rangeDates[1].getMonth() + 1)); // add 1 because months are indexed from 0
        if(monthTo.length===3)
        {
          monthTo = monthTo.substr(1);
        }
        yearTo = this.rangeDates[1].getFullYear();
        requestDateTo = yearTo +"-"+monthTo+"-"+dayTo;
      }
    }
    this.taskService.search(requestDateFrom, requestDateTo, this.requestType.id,this.status.id, this.serviceType.id).
    subscribe
    (
      result=>{
                this.sponsorshipTaskWrapperList = <SponsorshipTaskWrapper[]>result;

                this.sponsorshipTaskSearchResultRetrievedEvent.emit(this.sponsorshipTaskWrapperList);
              }
    );
  }

}
