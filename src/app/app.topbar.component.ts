import { AuthGuard } from './guard/authguard';
import { Input, OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import { AppService } from './service/app.service';
import { User } from './domain/user';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

  
    user:User;

    constructor(public app: AppComponent,private authGuard:AuthGuard,private appService:AppService) {
    }
   ngOnInit(){
    this.authGuard.userReady.subscribe(user=>{
        this.user=user;
    });
   }

   logout() {
    this.appService.logout();
    }

}
