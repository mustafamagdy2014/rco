import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Family } from '../domain/Family';
import { Person } from '../domain/person';
import { Applicant } from '../domain/Applicant';
import { SponsorshipRequestService } from './sponsorship-request.service';

@Injectable()
export class SharedService {
 
  mother:Person = new Person;
  father:Person = new Person;

 public widowAsApplicant=new EventEmitter<{ mother:Person , isChecked:Boolean }>();
 public widowAsNextOfKin=new EventEmitter<{ mother:Person , isChecked:Boolean }>();
 public errorOccurred=new EventEmitter<Error>();

 public globalMessageEvent=new EventEmitter<{message:string , type:string}>();

  constructor() { }

}
