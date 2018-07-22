import {  isNumeric } from 'rxjs/util/isNumeric';
import { Person } from './../domain/Person';
import { Injectable } from '@angular/core';
import { Contact } from '../domain/Contact';

@Injectable()
export class WidowValidationService {

  constructor() { }

  checkWidowContactDetails(contact:Contact):boolean{
    if(contact.mobilesms== null || contact.mobilesms==undefined || contact.mobilesms===""||!isNumeric(contact.mobilesms)||contact.mobile== null ||contact.mobile==undefined || contact.mobile===""||!isNumeric(contact.mobile))
    return false;

    return true;
  }
}
