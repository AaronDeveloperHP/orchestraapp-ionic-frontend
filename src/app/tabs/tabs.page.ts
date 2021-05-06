import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  otherTheme:boolean;
  
  constructor(private authService:AuthService) {
    this.otherTheme=this.authService.otherTheme;
  }

  ionViewDidEnter(){
   console.log("hola");
   this.otherTheme=this.authService.otherTheme;
 }
 ionViewWillEnter(){
  console.log("hola");
  this.otherTheme=this.authService.otherTheme;
}
ionViewDidLoad(){
  console.log("hola");
  this.otherTheme=this.authService.otherTheme;
}
ionViewWillLeave(){
  console.log("hola");
  this.otherTheme=this.authService.otherTheme;
}
}
