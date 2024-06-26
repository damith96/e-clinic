import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onClick(path: string) {
    this.router.navigate([path]);
  }

}
