import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status';
import { Router } from '@angular/router';
import { StatusService } from '../services/status.service';
import { AuthService } from '../services/auth/auth.service';
import { elementAt } from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.page.html',
  styleUrls: ['./employee-status.page.scss'],
})
export class EmployeeStatusPage implements OnInit {

  sta: Status[];
  admin :boolean;
  private email: string;
  status: boolean;
  search: string;
otherTheme:boolean;
dialogRef:any;
  constructor(private StatusService: StatusService, private AuthService: AuthService, private router: Router, private storage:Storage, public dialog: MatDialog) { }

  ngOnInit() {
    this.storage.get("role").then((val) => {
      console.log(val);
      if(val=="2"){
       this.admin=true;
      }
  });
  }

  ionViewWillEnter(){
this.otherTheme=this.AuthService.otherTheme;
    this.getAllStatuses();
  }

  statusReportViewer(){
    // this.RequestsService.getReport();
    window.open('https://orchestraapp-laravel-ionic.herokuapp.com/api/status/reporte');
  }

  getAllStatuses(){
    this.StatusService.getStatus().subscribe( sta => {
      this.sta = sta;
      if(this.sta.length == 0){
        console.log("agua")
        this.status = false
      } else {
        this.status = true
      }
    });
    document.getElementById("reload-icon").style.display = "none";
    document.getElementById("search-icon").style.display = "";
    this.search = "";
  }

  deleteStatus(id: number){
    this.StatusService.deleteStatus(id).subscribe( () => {
      this.getAllStatuses();
    }) 
  }


  getStatusByEmail(email: string){
    this.StatusService.getStatusByEmail(email).subscribe( sta => {
      this.sta = sta;
      if(this.sta.length == 0){
        console.log("agua")
        this.status = false
      } else {
        this.status = true
        console.log(this.search)
      }
    });
    document.getElementById("reload-icon").style.display = "";
    document.getElementById("search-icon").style.display = "none";
  }

  insertStatus(){
    this.router.navigateByUrl("/create-status");
  }

  StatusSearch(){
    if(this.search == ""){
      this.status = false;
    } else {
      this.getStatusByEmail(this.search)
    }
    
  }

  updateStatus(id: number){
    this.StatusService.setCurrentStatusId(id);
    this.router.navigateByUrl("/update-status");
  }

  isAdmin(){
    
    if(this.admin){
      this.admin = true;
    } 
  }

  return(){
    this.router.navigateByUrl("/tabs/tab1");
  }

  openDialog(id:number) {
    this.dialogRef = this.dialog.open(DialodConfirmDelete);

   this.dialogRef.afterClosed().subscribe(result => {
    /*  console.log(`Dialog result: ${result}`); */
    if(result=='Si'){
     this.deleteStatus(id);
    }
   });
 }
}
@Component({
  selector: 'dialod-confirm-delete',
  templateUrl: 'dialod-confirm-delete.html',
  styleUrls: ['dialod-confirm-delete.scss']
})
export class DialodConfirmDelete {
  constructor(public dialogRef: MatDialogRef<DialodConfirmDelete>) { }

  closeDialog() {
    this.dialogRef.close('No');
  }
  acceptDialog() {
    this.dialogRef.close('Si');
  }
}
