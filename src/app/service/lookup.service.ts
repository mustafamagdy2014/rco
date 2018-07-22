import { Resource } from './../common/resource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LookupService {
    
    constructor(private http: HttpClient) { }
    
    fetchLookup(){
        return this.http.get(Resource.GET_LOOKUP_URL);
    }
}