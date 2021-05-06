import { ReturnStatement } from '@angular/compiler';
import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusService } from '../services/status.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.page.html',
  styleUrls: ['./update-status.page.scss'],
})
export class UpdateStatusPage {

  sta: Status[];

  statusUpdateForm: FormGroup;
  otherTheme:boolean;

  constructor(public fb: FormBuilder, 
    private StatusService: StatusService,
    private router: Router,
    private AuthService: AuthService) {
    this.statusUpdateForm = this.fb.group({
      type: [''],
      startDate: [''],
      endDate: ['']
    });
  }

 ionViewWillEnter(){
  this.otherTheme=this.AuthService.otherTheme;
 }

  onFormSubmit() {
    if (!this.statusUpdateForm.valid) {
      
      return false;
      
    } else {

      let id = this.StatusService.getCurrentStatusId();
      let sta = {
        id: null,
        type: this.statusUpdateForm.value.type,
        startDate: this.statusUpdateForm.value.startDate, 
        endDate: this.statusUpdateForm.value.endDate, 
        userEmail: null
      }
      this.StatusService.updateStatus(id, sta)
        .subscribe((res) => {
          this.router.navigateByUrl("/employee-status");
        });
    }
  }

  return(){
    this.router.navigateByUrl("/employee-status");
  }

}
