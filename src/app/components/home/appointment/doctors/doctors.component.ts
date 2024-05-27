import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: { doctorId: number, doctorName: string, field: string, hospital: string }[] = [];

  constructor(private router: Router, private auth: AuthService) { 
  }

  ngOnInit(): void {
    this.getDoctors();
  }

  onClick(index:number):void {
    this.router.navigate(['/app/appointment',index]);
  }

  getDoctors():void{
    this.auth.getDoctors().subscribe(results =>{
      if(results.success){
        this.doctors = results.data;
      }else{
        alert(results.message);
      }
    });
  }

}
