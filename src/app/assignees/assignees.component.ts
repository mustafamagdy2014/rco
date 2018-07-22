import { Input, OnChanges } from '@angular/core';
import { AssigneeDetails } from './../domain/AssigneeDetails';
import { AssigneeService } from './../service/assignee.service';
import { Component, OnInit } from '@angular/core';
import { SponsershipRequest } from '../domain/SponsershipRequest';
import { Globals } from '../common/globals';

@Component({
  selector: 'assignees',
  templateUrl: './assignees.component.html',
  styleUrls: ['./assignees.component.css'],
  providers:[AssigneeService]
})
export class AssigneesComponent implements OnInit ,OnChanges{

  @Input() stageEnglishName: string;
  assigneeDetails:AssigneeDetails[];
  assignee:AssigneeDetails;

  header:string=Globals.ASSIGNEES_HEADER;



  constructor(private assigneeService:AssigneeService) { }

  ngOnInit() {
    
  }
   ngOnChanges(changes:any):void {
    let _stageEnglishName:string = changes.stageEnglishName.currentValue;
    if (_stageEnglishName) { 
     this. getAssignees();
     
    }
  }
 

  getAssignees(){
    this.assigneeService.getAssignees(this.stageEnglishName).subscribe(result=>{
      this.assigneeDetails=result;
      this.assignee=this.assigneeDetails[0];
    });
  }

}
