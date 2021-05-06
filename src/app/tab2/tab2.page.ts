import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {
   logged: boolean;
   admin :boolean;
   otherTheme:boolean;
    dialogRef:any;
  constructor(private AuthService: AuthService, private router: Router,private storage:Storage,public dialog: MatDialog) {}

  ionViewWillEnter() {
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
         this.admin=true;}
    })
    console.log(this.logged, this.admin);
  this.otherTheme=this.AuthService.otherTheme;
    
  }

  logout(){
    this.AuthService.logout();
    this.AuthService.token=null;
    document.getElementById("logout-alert").style.display = "";
    console.log("logged out")
  }

  showRegister(){
    if(!this.logged){
      document.getElementById("regist-button").style.display = "none";
    } 
    if(this.logged){
        if(!this.admin){
          document.getElementById("regist-button").style.display = "none";
        }
    }
    
  }

  loginPage(){
    this.router.navigateByUrl("/login");
  }

  dataPage(){
    this.router.navigateByUrl("/employee-data");
  }

  registPage(){
    this.router.navigateByUrl("/register");
  }
  

  isLogged(){
    this.logged = this.AuthService.isLogged()
    if(this.logged){
      this.router.navigateByUrl("/employee-data");
    } else if (!this.logged){
      this.router.navigateByUrl("/login");
    }
  }
  openDialog() {
     this.dialogRef = this.dialog.open(DialodConfirmLogout);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
 
  confirmLogout(){
    document.getElementById("logout-alert").style.display = "none";
    window.location.reload();
  }
}
@Component({
  selector: 'dialod-confirm-logout',
  templateUrl: 'dialod-confirm-logout.html',
})
export class DialodConfirmLogout {
  constructor(public dialogRef: MatDialogRef<DialodConfirmLogout>) { }

  closeDialog() {
    this.dialogRef.close('No');
  }
}