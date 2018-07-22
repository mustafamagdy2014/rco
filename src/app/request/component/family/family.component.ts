import { OnChanges } from '@angular/core';
import { UtilityService } from './../../../service/utility.service';
import { SponsershipRequest } from './../../../domain/SponsershipRequest';
import { Input } from '@angular/core';
import { Globals } from './../../../common/globals';
import { Component, OnInit } from '@angular/core';
import { Family } from '../../../domain/Family';
import { Router } from '@angular/router';

@Component({
  selector: 'family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit ,OnChanges {
  @Input()
  sponsershipRequest:SponsershipRequest;
  header:string;

  constructor(private globals:Globals,private utilityService:UtilityService,private router:Router) { }

  ngOnInit() 
  {
    this.header=this.globals.FAMILY_HEADER; 
  }

  ngOnChanges(changes:any):void {
    let _sponsershipRequest:SponsershipRequest = changes.sponsershipRequest.currentValue;
    if(_sponsershipRequest&&_sponsershipRequest.id){

    let creationDate=this.sponsershipRequest.createdOn;
    this.sponsershipRequest.createdOn=this.utilityService.transformDate(creationDate)
    }
  }

 
}
