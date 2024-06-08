import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private httpService: HttpService) {
    httpService.replaceQueryandParams('hello/{myParams}/route', { myParams: 124231231321, myParams2: 'werewr' }, { test: 1, test2: 2 },);
  }
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
