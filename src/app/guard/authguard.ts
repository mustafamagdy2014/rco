import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AppService } from '../service/app.service';
import { UserService } from '../service/user.service';
import { User } from '../domain/user';

@Injectable()
export class AuthGuard implements CanActivate{

   public userReady:EventEmitter<User>;

    constructor(private appService:AppService,private userService:UserService, private router: Router) {
        this.userReady=new EventEmitter();
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
        
       return  this.appService.checkTokenValidatiy().map((auth) => {
                    console.log("token is valid");
                    this.appService.User=<User>auth;
                    this.userReady.emit( this.appService.User);
                    return true;
           
            }
        ).catch(res => Observable.throw(this.appService.obtainAccessToken()))
    }
}