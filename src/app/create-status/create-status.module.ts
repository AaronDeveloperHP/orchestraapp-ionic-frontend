import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { CreateStatusPageRoutingModule } from './create-status-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { CreateStatusPage } from './create-status.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateStatusPageRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatCardModule,
    MatCheckboxModule, 
    MatButtonModule, 
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [CreateStatusPage]
})
export class CreateStatusPageModule {}
