import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssigneeDetails } from './../domain/AssigneeDetails';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Resource } from '../common/resource';

@Injectable()
export class AssigneeService {

  constructor(private httpClient:HttpClient) { }

  public getAssignees(stage:string){
    let _params=new HttpParams();
    _params=_params.set("stage",stage);
    return this.httpClient.get<AssigneeDetails[]>(Resource.GET_ASSIGNEES_URL,{params:_params});
  }
}
