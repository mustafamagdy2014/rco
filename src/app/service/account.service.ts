import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../common/resource';
import { Account } from '../domain/Account';
import { Sponser } from '../domain/Sponser';

@Injectable()
export class AccountService {

  constructor(private httpClient:HttpClient) { }
  
  addOrUpdateAccount(sponser:Sponser , account:Account){
    account.cpr=sponser.cpr;
    return this.httpClient.post<Account>(Resource.POST_ACCOUNT_URL,account);
  }
}
