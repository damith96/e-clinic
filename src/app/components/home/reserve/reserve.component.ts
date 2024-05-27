import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';
import { AuthService } from '../../../services/auth.service';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
  animations: [
    trigger('fade', [             //inside trigger we often have state and transition function calls
      transition('void => *', [   //goes void state to default state
        style({opacity:0, marginTop:20}),
        animate(1000),
      ])
    ])
  ]
})
export class ReserveComponent{

  patientId = 2;
  clinicTypes: string[] = ['Regular Eye clinics', 'Post operative clinics',
                            'Vitrio-Retinal clinic', 'Orbital and Oculoplastic',
                           'Glaucoma clinic','Cornea and External Eye Diseases',];
  dates: string[] = ['Any', 'Weekdays', 'Weekend']
  reservationForm: FormGroup;
  disable = true;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {
    this.reservationForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      type: new FormControl(null),
      nextDate: new FormControl('',[Validators.required]),
      planningDate: new FormControl(null),
      note: new FormControl(''),
    });
    this.reservationForm.controls['type'].setValue('Regular Eye clinics', { onlySelf: true });
    this.reservationForm.controls['planningDate'].setValue('Any', { onlySelf: true });
  }

  onSubmit() {
    var data = {
      id: this.patientId,
      patientName: this.reservationForm.value.username,
      type: this.reservationForm.value.type,
      nextDate: moment(this.reservationForm.value.nextDate).format("YYYY-MM-DD"),
      planningDate: this.reservationForm.value.planningDate,
      note: this.reservationForm.value.note
    };

    if(this.reservationForm.valid){
      this.authService.reservation(data).subscribe(result=>{
        if(result.success){
          this.dialog.open(DialogComponent)
        }
      });
    }
  }

}
