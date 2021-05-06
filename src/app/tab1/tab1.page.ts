import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import { Requests } from '../models/requests';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  admin:boolean;
  logged: boolean;
  req:Requests[];
  uncheckedRequests:number=0;
  otherTheme:boolean;
  constructor(private RequestsService: RequestsService,private AuthService: AuthService, private router: Router, private storage:Storage) {}
  
  ionViewWillEnter() {
    this.otherTheme=this.AuthService.otherTheme;
    this.storage.get('token').then (
      data => {
        if(data != null) {
          this.logged= true;
        } else {
          this.logged= false;
        }
      });
    this.storage.get("role").then((val) => {
      console.log(val);
      if(val=="2"){
       this.admin=true;
       }
  });
  this.uncheckedRequests=0
  this.countUnrevisedRequests();
  
  }
  getAllRequests(){
    this.RequestsService.getRequests().subscribe( req => {
      this.req = req;
    });
  }
  isLogged(){
    if(this.logged){
      
      this.router.navigateByUrl("/employee-requests");
    } else if (!this.logged){
      this.router.navigateByUrl("/login");
    }
  }
countUnrevisedRequests(){
 this.RequestsService.getRequests().subscribe( req => {
      this.req = req;
      for (let i = 0; i < this.req.length; i++) {
        let element = this.req[i];
        console.log(i);
        if(element.revised=="Sin revisar"){
          this.uncheckedRequests++;
          console.log(this.uncheckedRequests);
        }
      }
    });
}
  isLogged2(){
    if(this.logged){
      
      this.router.navigateByUrl("/employee-status");
    } else if (!this.logged){
      this.router.navigateByUrl("/login");
    }
  }
}
