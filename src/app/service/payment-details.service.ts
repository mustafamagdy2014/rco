import { Resource } from './../common/resource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentDetailsService {

  constructor(private http: HttpClient) {}

  getPaymentDetails(cpr: number) {
    return this.http.get(Resource.GET_BENEFICIARY_PAYMENT_URL + cpr);
  }

}
