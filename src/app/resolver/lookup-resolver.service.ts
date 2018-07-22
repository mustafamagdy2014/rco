import { LookupService } from './../service/lookup.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Resolve } from '@angular/router';

//resolver for fetching all lookups from the server , before angular reouter routes to url-path-
@Injectable()
export class LookupResolverService implements Resolve<any> {
    constructor(private lookupservice:LookupService) { }

    resolve(){
        return this.lookupservice.fetchLookup();
    }
    
}