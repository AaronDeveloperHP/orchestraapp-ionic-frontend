import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage {

  constructor(private authService:AuthService,private router: Router) { }
  ionViewWillEnter(){
    this.otherTheme=this.authService.otherTheme;
  }
otherTheme:boolean;
  changeTheme(){
    this.authService.otherTheme= !this.authService.otherTheme;
   this.otherTheme=this.authService.otherTheme;

console.log(this.authService.otherTheme);
  }
  return(){
    this.router.navigateByUrl("/tabs/tab2");
  }
}
