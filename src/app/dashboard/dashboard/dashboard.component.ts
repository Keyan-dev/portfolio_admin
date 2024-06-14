import { Component, OnInit } from '@angular/core';
import { CommonAuthService } from 'src/app/services/common-auth.service';
import { CommonSnackbarService } from 'src/app/services/common-snackbar.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private httpService: HttpService,
    private snackbar: CommonSnackbarService,
    private authService: CommonAuthService
  ) {

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
  ngOnInit() {
    // this.authService.userDetails.subscribe(data => {
    //   console.log("userData...", data);
    // })
  }
}
