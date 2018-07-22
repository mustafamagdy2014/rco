import { Resource } from './../../common/resource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) {}

  getCashingList(month: number, year: number) 
  {
    return this.http.get(Resource.GET_CASHING_LIST_URL+month+"&year="+year);
  }

  getMonthlyDifferencesList(firstMonth:number, firstYear:number, secondMonth:number, secondYear:number)
  {
    return this.http.get(Resource.GET_MONTHLY_DIFFERENCES_LIST_URL+firstMonth+"&firstYear="+firstYear+"&secondMonth="+secondMonth+"&secondYear="+secondYear);
  }

}
