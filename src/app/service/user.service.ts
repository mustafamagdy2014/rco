import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '../common/resource';

@Injectable()
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getLoggedInUser(){
    return this.httpClient.get(Resource.GET_USER_DETAILS);
  }
}
