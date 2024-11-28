import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, NgFor, RouterLink, RouterOutlet]
})
export class HomeComponent {
  menuDetails = [{
    name: 'Dashboard',
    routeLink: '/app/dashboard'
  }, {
    name: 'Hero',
    routeLink: '/app/hero'
  }, {
    name: 'skills',
    routeLink: '/app/skills'
  }];

  constructor(private router: Router) {

  }

  navigateSignIn() {
    this.router.navigate(['signin']);
  }
}
