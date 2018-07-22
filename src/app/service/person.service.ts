import { Resource } from './../common/resource';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpParams, HttpClient } from "@angular/common/http";

@Injectable()
export class PersonService {
  constructor(private http: HttpClient) {}

  getPerson(cpr: string,personType:string) {
    return this.http.get(Resource.GET_PERSON_URL + cpr,
      {
        params: {
          personType: personType
        }

      }
     
      );
  }
/* 
  getPersonName(cpr: string,personType:string) {
    return this.http.get(Resource.GET_PERSON_NAME_URL + cpr,
      {
        params: {
          personType: personType
        }

      }
     
      );
  } */
}
