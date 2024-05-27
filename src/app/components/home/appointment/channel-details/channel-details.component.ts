import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { DialogComponent } from '../../../dialog/dialog.component';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.css']
})
export class ChannelDetailsComponent implements OnInit{

  paymentMethods: string[] = ['ANY MASTER OR VISA', 'FRIMI', 'MOBITEL ADD TO BILL', 'SAMPATH VISHWA'];
  appointmentForm: FormGroup;
  disable = true;
  doctorName = "";
  field = "";
  date = "";
  time = "";
  patientNo = 0;
  hospital = "";
  type = "Reservation";
  doctorIndex = 0;

  constructor(private authService: AuthService, private router: Router,
    private dialog: MatDialog, private route: ActivatedRoute) {
    this.appointmentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nationalId: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      telephone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      payment: new FormControl(null),
    });

    // this.appointmentForm.controls['payment'].setValue('ANY MASTER OR VISA', { onlySelf: true });
    // this.doctorName = appointment.doctor.doctorName;
    // this.field = appointment.doctor.field;
    // this.hospital = appointment.doctor.hospital;
    // this.date = day.day.day;
    // this.time = day.day.time;
    // this.patientNo = day.day.noPatients + 1;

  }

  ngOnInit(): void {
    this.getDays();
  }

  getDays(): void {
    this.route.params.subscribe(param => {
      this.doctorIndex = param['doctorIndex'];
      // this.doctorName = doctor.doctorName;
      // this.field = doctor.field;
      // this.hospital = doctor.hospital;
      // this.date = day.day;
      // this.time = day.time;
      // this.patientNo = day.noPatients + 1;
    });
  }

  onSubmit() {
    // const doctorId = this.appointService.doctors[this.doctorIndex].doctorId;
    // if(this.appointmentForm.valid){
    //   this.authService.updatePatient(doctorId, this.date, this.patientNo);
    //   this.authService.appointment(this.appointmentForm.value).subscribe(result=>{
    //     if(result.success){
    //       this.type = "Channeling"
    //       this.dialog.open(DialogComponent);
    //     }
    //   });
    // }
  }

}
