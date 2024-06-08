import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {

  }
  menuDetails = [{
    name: 'Dashboard',
    routeLink: '/app/dashboard'
  }, {
    name: 'Skill Group',
    routeLink: '/app/skills'
  },
  {
    name: 'Technology',
    routeLink: '/app/technology'
  }];
  navigateSignIn() {
    this.router.navigate(['signin']);
  }
  ngOnInit(): void {

  }
}
