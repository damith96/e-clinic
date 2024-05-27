import { AuthService } from '../../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  animations: [
    trigger('fade', [             //inside trigger we often have state and transition function calls
      transition('void => *', [   //goes void state to default state
        style({opacity:0, marginTop:20}),
        animate(1000),
      ])
    ])
  ]
})
export class AppointmentComponent{}
