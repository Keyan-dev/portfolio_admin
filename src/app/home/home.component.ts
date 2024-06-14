import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAuthService } from '../services/common-auth.service';
import { CommonSnackbarService } from '../services/common-snackbar.service';
import { ɵparseCookieValue } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptionObj = new Subscription();

  pageProperties: {
    isLoader: boolean,
    menuDetails: [{ name: string, routeLink: string }]
    userName: string
  } = {
      isLoader: false,
      menuDetails: [{ name: 'Dashborad', routeLink: 'app/dashboard' }],
      userName: 'user'
    }
  constructor(
    private router: Router,
    private authService: CommonAuthService,
    private snackBar: CommonSnackbarService
  ) {

  }
  ngOnInit(): void {
    this.subscriptionObj.add(
      this.authService.userDetails.subscribe((data) => {
        if (!data) { this.getTokenUserDetails(); }
        else { this.pageProperties.menuDetails = data.menus; this.pageProperties.userName = data.name }
      })
    );
  }
  getTokenUserDetails() {
    console.log("getTokenUserDetails called....");
    let userToken = ɵparseCookieValue(document.cookie, '__pa_token');
    if (userToken) {
      this.authService.getUserDetails(userToken).subscribe({
        next: (data: any) => {
          this.pageProperties.isLoader = false;
          this.authService.userDetails.next(data);
          this.pageProperties.menuDetails = data?.menus;
          this.pageProperties.userName = data?.name;
        },
        error: (err) => {
          this.router.navigate(['signin'])
          this.snackBar.openCustomSnackBar('Failed to get login user details' + err.message, 'close', 'failed', 2000, 'center', 'bottom');
        }
      });
      return true;
    }
    else {
      this.snackBar.openCustomSnackBar('No user details found! Sign in to continue.', 'close', 'info', 3000, 'center', 'bottom');
      this.router.navigate(['signin']);
      return true;
    }

  }
  logout() {
    document.cookie = "__pa_token=;path=/;";
    this.subscriptionObj.unsubscribe();
    this.authService.userDetails.next(null);
    this.router.navigate(['signin']);
  }
  ngOnDestroy() {
    this.subscriptionObj.unsubscribe();
  }
}
