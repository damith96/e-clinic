import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Messages{
  [key: string]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = "Dashboard";
  route = true;
  notifications = null;
  isSideMode = true;
  messages: Messages = {
    "/app/dashboard": "Dashboard",
    "/app/reserve": "Reserve a date",
    "/app/appointment": "Meet your doctor",
    "/app/schedule": "Clinic schedule",
    "/app/pharmacy": "Online pharmacy service",
    "/app/profile": "Profile",
  }

  constructor(private router: Router, private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      const currentRoute = this.router.url;
      localStorage.setItem('route', currentRoute);

      this.message = this.messages[this.location.path()];
    });
    this.isSideMode = window.innerWidth < 450 ? false : true;
  }

  logout() {
    this.authService.logout();
  }

  profile() { 
    this.router.navigate(['/app/profile']);
  }

  @HostListener("window:resize",['$event.target.outerWidth'])
  onResize(width: number){
    this.isSideMode = width < 450 ? false : true;
  }
}
