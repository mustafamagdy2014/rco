import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Resource } from '../common/resource';
import { DatePipe } from '@angular/common';
import { Globals } from '../common/globals';

@Injectable()
export class UtilityService {
    
    constructor(private httpClient: HttpClient,private datePipe:DatePipe) {  }
    encode(value:any):string{
        return btoa(value);
    }

    decode(value:string){
        if(value){
            return atob(value);
        }
       return null;
    }
    replacePattern(original:string , pattern:string[] , values:string[]):string{
        let counter=0;
        values.forEach(value=>{
            original=original.replace(pattern[counter],value);
            counter++;
        });
       return original;
    }

    transformDate(date:any):any {
        let _date = this.datePipe.transform(date,Globals.DATE_FMT);
        return _date;
      }

}