import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public message = 'Dashboard';
  public route = true;
  notifications = null;

  constructor(private router: Router, private authService: AuthService, private location: Location) { }


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      const currentRoute = this.router.url;
      localStorage.setItem('route', currentRoute);

      if (this.location.path() === "/app/dashboard") {
        this.message = 'Dashboard';
      } else if (this.location.path() === "/app/reserve") {
        this.message = 'Reserve a date';
      } else if (this.location.path() === "/app/appointment") {
        this.message = 'Meet your doctor';
      } else if (this.location.path() === "/app/schedule") {
        this.message = 'Clinic schedule';
      } else if (this.location.path() === "/app/pharmacy") {
        this.message = 'Online pharmacy service';
      } else if (this.location.path() === "/app/profile") {
        this.message = 'Profile';
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  profile() { 
    this.router.navigate(['/app/profile']);
  }
}
