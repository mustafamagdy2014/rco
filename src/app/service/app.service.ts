import { environment } from './../../environments/environment';
import { EventEmitter } from '@angular/core';
import { User } from './../domain/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  RequestOptions } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Resource } from '../common/resource';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class AppService {
  
   private user:User;
  constructor(
    private _router: Router, private oauthService: OAuthService,private httpClient:HttpClient){
        this.oauthService.loginUrl = environment.resourceServer+'oauth/authorize'; 
        this.oauthService.redirectUri = environment.redirectUri;
        this.oauthService.logoutUrl=environment.resourceServer+"oauth/logout";
        this.oauthService.clientId = "client";
        this.oauthService.scope = "read write";    
        this.oauthService.oidc=false;
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.tryLogin({});  
    }
  
  obtainAccessToken(){
      this.oauthService.initImplicitFlow();
  }
 
  /*
  //don't use
  isLoggedIn(){ 
    if (this.oauthService.getAccessToken() === null||!this.oauthService.hasValidAccessToken()){
       return false;
    }
    return true;
  } 
 */
  logout() {
    this.oauthService.logOut();
    window.location.href = this.oauthService.logoutUrl;
  //this.logoutFromResourceServer();
    
  }
  /* private logoutFromResourceServer(){
    let _headers = new HttpHeaders();
    _headers = _headers.set("authorization","Bearer "+this.oauthService.getAccessToken());
    this.httpClient.post(this.oauthService.logoutUrl,{},{headers:_headers}).subscribe(response=>{ //,{headers:_headers}
      console.log("log out successfully");
      this.oauthService.logOut();
      window.location.href = this.oauthService.logoutUrl;
    });
  } */

  checkTokenValidatiy(){
    return this.httpClient.get(Resource.CHECK_TOKEN_VALIDITY+this.oauthService.getAccessToken());
  }
  getAccessToken():string{
    return  this.oauthService.getAccessToken();
  }
  hasRole(role:string):boolean{
    return this.user.authorities.includes(role);
  }
  set User(value:User){
    this.user=value;
  }
  get User(){
    return this.user;
  }
  
}