import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sponser } from '../domain/Sponser';
import { Resource } from '../common/resource';

@Injectable()
export class SponserService {

  constructor(private httpClient:HttpClient) { }

  mergeSponser(sponser:Sponser){
    return this.httpClient.post<Sponser>(Resource.POST_SPONSER_URL,sponser);
  }
}
