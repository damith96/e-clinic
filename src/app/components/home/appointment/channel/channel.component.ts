import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  animations: [
    trigger('fade', [             //inside trigger we often have state and transition function calls
      transition('void => *', [   //goes void state to default state
        style({ opacity: 0, marginTop: 20 }),
        animate(1000),
      ])
    ])
  ]
})
export class ChannelComponent implements OnInit {

  doctorName = "";
  field = "";
  hospital = "";
  days: any[] = [];
  doctorId = 0;

  constructor(private auth: AuthService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.getDays();
  }

  onClick(dayIndex: number): void {
    this.router.navigate(['/app/appointment',this.doctorId,dayIndex])
  }

  getDays(): void {
    this.route.params.subscribe(param => {
      this.doctorId = param['doctorIndex'];
      this.auth.getDoctor(this.doctorId).subscribe(result => {
        if (result.success) {
          const doctor = result.data;
          this.doctorName = doctor.doctorName;
          this.field = doctor.field;
          this.hospital = doctor.hospital;
        }
      });
      // this.auth.getDays(this.doctorId).subscribe(results => {
      //   if (results.success) {
      //     this.days = results.data;
      //   }
      // });
    })

  }

}
