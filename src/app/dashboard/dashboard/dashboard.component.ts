import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true
})
export class DashboardComponent {
  dashboardDetails = [{
    title: 'Projects'
  }, {
    title: 'skills'
  }, {
    title: 'experience'
  }, {
    title: 'code labs'
  }]
}
